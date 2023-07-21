const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs');

const Collection = sequelize.define(
    'Collection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Collection name is required'
            },
            notEmpty: {
                msg: 'Collection name cannot be empty'
            }
        }
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Description is required'
            },
            notEmpty: {
                msg: 'Description cannot be empty'
            }
        }
    },
    topic: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
    }
},
    {
        tableName: "collections",
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Collection;