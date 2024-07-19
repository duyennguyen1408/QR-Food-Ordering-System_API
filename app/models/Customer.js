const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Customer = MySequelize.define(
    "tbl_customers",
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
        tableName: "tbl_customers",
    }
);

module.exports = Customer;
