const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_main_text: {
            type: DataTypes.TEXT,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                targetKey: 'id',
            },
        },
        // user_name: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }   
        // },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;
