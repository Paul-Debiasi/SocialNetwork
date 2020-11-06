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
        res.redirect("/logo");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req.body:", req.body);
    if (email && password) {
        db.userEmail(email).then(({ rows }) => {
            if (rows.length !== 0) {
                const hash = rows[0].password;
                bcrypt
                    .compare(password, hash)
                    .then((auth) => {
                        if (auth) {
                            req.session.userId = id;
                            req.session.user.profile = true;
                            res.json("/logo");
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
app.get("*", function (req, res) {
    // console.log("My star");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

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

app.listen(8080, function () {
    console.log("I'm listening.");
});
// req.session = null and redirect to welcome page
