const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Discount = MySequelize.define(
    "tbl_discounts",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        dishId: {
            field: "dish_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Dish,
                key: "id",
            },
        },
        comboId: {
            field: "combo_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Combo,
                key: "id",
            },
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
        discountValue: {
            field: "discount_value",
            type: Sequelize.DECIMAL(10, 2),
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
        validFrom: {
            field: "valid_from",
            type: Sequelize.DATE,
            allowNull: false,
        },
        validUntil: {
            field: "valid_until",
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
        tableName: "tbl_discounts",
    }
);

module.exports = Discount;
