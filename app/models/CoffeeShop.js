const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let CoffeeShop = MySequelize.define(
    "tbl_coffee_shops",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        managerId: {
            field: "manager_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.User,
                key: "id",
            },
        },
        coffeeShopName: {
            field: "coffee_shop_name",
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        coffeeShopDesc: {
            field: "coffee_shop_desc",
            type: Sequelize.TEXT("long"),
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
        tableName: "tbl_coffee_shops",
    }
);

module.exports = CoffeeShop;
