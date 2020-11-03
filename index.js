// We gonna be running 2 server, 8081 is gonna be compiling and 8080 it's our express server for our request.
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
// compression is a npm module to minimize the size of the responses(it's a middleware)
const compression = require("compression");
app.use(express.json);
app.use(
    cookieSession({
        secret: "What ever I want my secret to be",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.static("public"));
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
    console.log("req.body: ", req.body);

    // when everything works (i.e. hashing and inserting a row, and adding somethin to the session object)
    req.session.userId = 1;
    res.json({ success: true });
});

app.get("/welcome", (req, res) => {
    console.log();
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// The * rout is gonna catch all the routs
app.get("*", function (req, res) {
    console.log("My star");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
