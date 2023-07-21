const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs');

const Item = sequelize.define(
    'Item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Item name is required'
            },
            notEmpty: {
                msg: 'Item name cannot be empty'
            }
        }
    },
},
    {
        tableName: "items",
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Item;