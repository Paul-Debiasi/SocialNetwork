// import axios from "./axios";
// We gonna be running 2 server, 8081 is gonna be compiling and 8080 it's our express server for our request.
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
// compression is a npm module to minimize the size of the responses(it's a middleware)
const compression = require("compression");
const db = require("./db.js");
const bcrypt = require("./bc.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const { response } = require("express");
const { hash } = require("bcryptjs");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { log } = require("console");
const secretCode = cryptoRandomString({
    length: 6,
});

app.use(express.json());

app.use(
    cookieSession({
        secret: "What ever I want my secret to be",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.static("public"));
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
// if we are running locally port 8080
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    // if our project is on heroku
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
app.post("/register", (req, res) => {
    console.log("Hit the post register route!!!");
    const { first, last, email, password } = req.body;
    console.log("req.body: ", req.body);

    // when everything works (i.e. hashing and inserting a row, and adding something to the session object)
    bcrypt
        .hash(password)
        .then((hash) => {
            console.log("oh my hash:", hash);
            return db.user(first, last, email, hash);
        })
        .then((result) => {
            const { id } = result.rows[0];
            req.session.userId = id;
            console.log("my id:", id);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error post /register route: ", err);
            res.json({ success: false });
        });
});

app.get("/welcome", (req, res) => {
    console.log("welcome");
    if (req.session.userId) {
        res.redirect("/App");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req.body:", req.body);
    if (email && password) {
        db.userEmail(email).then(({ rows }) => {
            const { id } = rows;
            console.log("rows:", rows);
            if (rows.length !== 0) {
                const hash = rows[0].password;
                console.log("Hashing:", hash);
                bcrypt
                    .compare(password, hash)
                    .then((auth) => {
                        if (auth) {
                            console.log("auth:", auth);
                            req.session.userId = rows[0].id;
                            console.log(
                                "req.session.userId:",
                                req.session.userId
                            );
                            // req.session.user.profile = true;
                            res.json({ success: true });
                        } else {
                            console.log("Something went wrong!");
                        }
                    })
                    .catch((err) => {
                        console.log("Err in matching the password: ", err);
                    });
            }
        });
    }
});
// The * rout is gonna catch all the routs

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    console.log("On Post-Password req.body:", req.body);
    db.userEmail(email).then(({ rows }) => {
        console.log("rows:", rows);
        if (rows[0]) {
            console.log("data", rows[0]);
            db.insertIntoReset(email, secretCode)
                .then(() => {
                    console.log("resetCode:", secretCode);
                    const subject = "Verification code";
                    const message = ` Please reset your password with the following code: ${secretCode}`;
                    return ses.sendEmail(email, message, subject);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Error requiring the secret-code:", err);
                    // "Error requiring the secret-code:", err;
                });
        } else {
            res.json({
                success: false,
            });
        }
    });
});

app.post("/password/reset/verify", (req, res) => {
    const { email, code, password } = req.body;
    console.log("req.body", req.body);
    if (code !== "" && password !== "") {
        db.code(email)
            .then(({ rows }) => {
                console.log("My response:", rows);
                if (code == rows.code) {
                    bcrypt
                        .hash(password)
                        .then((hash) => {
                            db.updatePsw(hash, email)
                                .then(({ rows }) => {
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log("Error on UpdatePsw:", err);
                                });
                        })
                        .catch((err) => {
                            console.log("Error hashing the Psw:", err);
                        });
                } else {
                    res.json({ success: false });
                }
            })
            .catch((err) => {
                console.log("Error on the Code:", err);
            });
    }
});

app.post("/images", uploader.single("file"), s3.upload, (req, res) => {
    const { id } = req.body;
    const { filename } = req.file;
    // we need to send response to Vue, so .then part can run, otherwise it will only run .catch in script.js
    if (req.file) {
        const url = `https://s3.amazonaws.com/spicedling/${filename}`;
        console.log("My data:", url, id);
        db.userImage(url, id)
            .then(({ rows }) => {
                rows = rows[0];
                console.log("UserImage:", rows);
                res.json(rows);
            })
            .catch((err) => {
                console.log("error in posting image: ", err);
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/bio", (req, res) => {
    const { bio, id } = req.body;
    db.insertBio(bio, id)
        .then(({ rows }) => {
            rows = rows[0];
            console.log("My result from rows:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in posting image: ", err);
            res.json({
                success: false,
            });
        });
});

app.get("/user", (req, res) => {
    const { userId } = req.session;
    db.userInfo(userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(() => {});
    console.log("The route is working");
});
app.get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    console.log("My params:", req.params);
    const { userId } = req.session;
    if (id == userId) {
        res.json({ denied: true });
    } else {
        try {
            const { rows } = await db.getOtherUserDataById(id);
            if (rows[0]) {
                res.json(rows[0]);
                console.log(rows[0]);
            } else {
                res.json({ denied: true });
            }
        } catch {
            console.log("error in api user");
            res.json({ denied: true });
        }
    }
});

app.get("*", function (req, res) {
    // console.log("My star");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
// req.session = null and redirect to welcome page
