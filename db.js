var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social`
);

module.exports.user = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id
    `,
        [first, last, email, password]
    );
};

exports.userEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [
        email,
    ]);
};

exports.resetPsw = (password) => {
    return db.query(`SELECT * FROM my_table
	WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`);
};
