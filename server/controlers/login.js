const User = require("../models/user");
const { checkPassword } = require("./hashFunc");
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({ where: { username } });

        if(!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const isPasswordValid = await checkPassword(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password is not correct' });
          }

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },  
            '1324qewr',
            {expiresIn: '3600s'}
        );
        res.json(accessToken);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { login };