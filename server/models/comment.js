const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs');

const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Comment content is required',
                },
                notEmpty: {
                    msg: 'Comment content cannot be empty',
                },
            },
        },
    },
    {
        tableName: 'comments',
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Comment;