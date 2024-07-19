const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Category = MySequelize.define(
    "tbl_categories",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        coffeeShopId: {
            field: "coffee_shop_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.CoffeeShop,
                key: "id",
            },
        },
        categoryName: {
            field: "category_name",
            type: Sequelize.STRING(45),
            allowNull: false,
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
        tableName: "tbl_categories",
    }
);

module.exports = Category;
