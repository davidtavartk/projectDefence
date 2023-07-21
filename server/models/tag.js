const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs');

const Tag = sequelize.define(
    'Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
    {
        tableName: "tags",
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Tag;