const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const constant = require("../utils/Constant");

let User = MySequelize.define(
    "tbl_users",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            field: "username",
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true,
        },
        password: {
            field: "password",
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        fullName: {
            field: "full_name",
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        phoneNumber: {
            field: "phone_number",
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true,
        },
        userRole: {
            field: "user_role",
            type: Sequelize.TINYINT(1),
            allowNull: false,
        },
        activated: {
            field: "activated",
            type: Sequelize.TINYINT(1),
            allowNull: false,
            default: constant.ACTIVATED.YES,
        },
        deleted: {
            field: "deleted",
            type: Sequelize.TINYINT(1),
            allowNull: false,
            default: constant.DELETED.NO,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: false,
        updatedAt: false,
        createdAt: false,
        includeDeleted: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "tbl_users",
    }
);

module.exports = User;
