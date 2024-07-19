const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Combo = MySequelize.define(
    "tbl_combos",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        comboName: {
            field: "combo_name",
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        comboDesc: {
            field: "combo_desc",
            type: Sequelize.TEXT("long"),
            allowNull: true,
        },
        comboPrice: {
            field: "combo_price",
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        comboImageUrl: {
            field: "combo_img_url",
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        deleted: {
            field: "deleted",
            type: Sequelize.TINYINT(1),
            allowNull: false,
            default: Constant.DELETED.NO,
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
        tableName: "tbl_combos",
    }
);

module.exports = Combo;
