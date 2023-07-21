const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projectusers', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports.connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connection is succesful")
    } catch (err) {
        console.log(err)
    }
}

module.exports.sequelize = sequelize;