const jwt = require('jsonwebtoken');

module.exports.createJWT = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
};
