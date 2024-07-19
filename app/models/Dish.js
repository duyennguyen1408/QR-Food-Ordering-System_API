const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Dish = MySequelize.define(
    "tbl_dishes",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        categoryId: {
            field: "category_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Category,
                key: "id",
            },
        },
        dishTitle: {
            field: "dish_title",
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        dishDesc: {
            field: "dish_desc",
            type: Sequelize.TEXT("long"),
            allowNull: true,
        },
        dishPrice: {
            field: "dish_price",
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        itemImageUrl: {
            field: "item_img_url",
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
        tableName: "tbl_dishes",
    }
);

module.exports = Dish;
