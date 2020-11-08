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

module.exports.insertIntoReset = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes(email, code)
		VALUES($1,$2) RETURNING * `,
        [email, code]
    );
};

exports.userEmail = (email) => {
    return db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER($1)
	`,
        [email]
    );
};
exports.updatePsw = (hash, email) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        hash,
        email,
    ]);
};
exports.code = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
	WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' AND email = $1
	ORDER BY id DESC
	LIMIT 1`,
        [email]
    );
};

exports.userInfo = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};
exports.userImage = (profileImage, id) => {
    return db.query(
        `UPDATE users SET image = $1 WHERE id = $2 RETURNING image `,
        [profileImage, id]
    );
};
