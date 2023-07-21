const User = require("../models/user");
const { hashPassword } = require("./hashFunc");
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username: username,
            password: hashedPassword,
            email: email
        });

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },  
            '1324qewr',
            { expiresIn: '3600s' }
        );
        console.log(accessToken);
        console.log(user.id, user.username)

        res.status(200).json({ message: 'User registered successfully', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user' });
    }
}

module.exports = { registration };
