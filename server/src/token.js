const jwt = require('jsonwebtoken');

module.exports.createJWT = (user) => {
    console.log({ id: user._id.toString(), role: user.role, username: user.username });
    return jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
};
