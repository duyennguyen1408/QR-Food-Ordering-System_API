const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Order = MySequelize.define(
    "tbl_orders",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        tableId: {
            field: "table_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Table,
                key: "id",
            },
        },

        orderDate: {
            field: "order_date",
            type: Sequelize.DATE,
            allowNull: false,
        },
        totalPrice: {
            field: "total_price",
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            field: "status",
            type: Sequelize.ENUM("Confirmed", "Preparing", "Completed"),
            defaultValue: "Confirmed",
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
        tableName: "tbl_orders",
    }
);

module.exports = Order;
