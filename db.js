var spicedPg = require("spiced-pg");
const { HotModuleReplacementPlugin } = require("webpack");
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

module.exports.userEmail = (email) => {
    return db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER($1)
	`,
        [email]
    );
};

module.exports.updatePsw = (hash, email) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        hash,
        email,
    ]);
};

module.exports.code = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
	WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' AND email = $1
	ORDER BY id DESC
	LIMIT 1`,
        [email]
    );
};

module.exports.userInfo = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.userImage = (profileImage, id) => {
    return db.query(
        `UPDATE users SET image = $1 WHERE id = $2 RETURNING image `,
        [profileImage, id]
    );
};

module.exports.insertBio = (bio, id) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio;`, [
        bio,
        id,
    ]);
};

module.exports.getOtherUserDataById = (id) => {
    return db.query(
        `SELECT id, first, last, image, bio, id FROM users WHERE id = $1`,
        [id]
    );
};

module.exports.getMatchingUser = (val) => {
    return db.query(
        `SELECT id, first, last, image FROM users
		WHERE first ILIKE  $1
		ORDER BY first
		ASC LIMIT 5
		`,
        [val + "%"]
    );
};

module.exports.getUsers = () => {
    return db.query(
        `SELECT id, first, last, image FROM users ORDER BY id DESC LIMIT 3`
    );
};

module.exports.getStatus = (sender, recipient) => {
    return db.query(
        `SELECT * FROM friendships
	WHERE (recipient_id = $1 AND sender_id = $2)
	OR (recipient_id = $2 AND sender_id = $1)`,
        [sender, recipient]
    );
};

module.exports.addFriends = (sender, recipient, accepted) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id, accepted)
	     VALUES ($1, $2, $3)`,
        [sender, recipient, accepted]
    );
};

module.exports.acceptFriends = (sender, recipient, accepted) => {
    return db.query(
        `UPDATE friendships SET accepted = $3 WHERE (recipient_id = $1 AND sender_id = $2)
	    OR (recipient_id = $2 AND sender_id = $1)`,
        [sender, recipient, accepted]
    );
};

module.exports.deleteFriends = (sender, recipient) => {
    return db.query(
        `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2)
	    OR (recipient_id = $2 AND sender_id = $1) 
	    RETURNING sender_id`,
        [sender, recipient]
    );
};

module.exports.getFriends = (id) => {
    return db.query(
        `  SELECT users.id, first, last, image, accepted, sender_id, recipient_id
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
`,
        [id]
    );
};

module.exports.chatHistory = () => {
    return db.query(
        `
        SELECT chat.id, message, first, last, chat.time, image
        FROM chat
        JOIN users
        ON author = users.id
        ORDER BY chat.time DESC
        LIMIT 10;
        `
    );
};

module.exports.chatMessage = (userId, message) => {
    return db.query(
        `
        INSERT INTO chat
        (author, message)
        VALUES ($1, $2);
        `,
        [userId, message]
    );
};
