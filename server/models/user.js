const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs');


const User = sequelize.define(
    'User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Username is required'
            },
            notEmpty: {
                msg: 'Username cannot be empty'
            }
        }
    },
    password: {
        type: DataTypes.STRING(75),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password is required'
            },
            notEmpty: {
                msg: 'Password cannot be empty'
            }
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    }
},
{
    tableName: "users",
        freezeTableName: true,
            underscored: true,
                createdAt: 'created_at',
                    updatedAt: 'updated_at'
}
);

module.exports = User;