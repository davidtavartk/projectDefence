const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    return hash;
}

const checkPassword = async(password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    if(result) {
        // console.log('Successfull')
        return hashedPassword;
    } else {
        console.log('noT Correct');
    }
}

module.exports = {hashPassword, checkPassword};