const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let OrderDetail = MySequelize.define(
    "tbl_order_details",
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
            allowNull: true,
            references: {
                model: this.Dish,
                key: "id",
            },
        },
        comboId: {
            field: "combo_id",
            type: Sequelize.INTEGER(11),
            allowNull: true,
            references: {
                model: this.Combo,
                key: "id",
            },
        },
        orderId: {
            field: "order_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Order,
                key: "id",
            },
        },
        quantity: {
            field: "quantity",
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            field: "price",
            type: Sequelize.DECIMAL(10, 2),
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
        tableName: "tbl_order_details",
    }
);

module.exports = OrderDetail;
