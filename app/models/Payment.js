const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Payment = MySequelize.define(
    "tbl_payments",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
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
        paymentDesc: {
            field: "payment_desc",
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        paymentMethod: {
            field: "payment_method",
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        status: {
            field: "status",
            type: Sequelize.TINYINT(6),
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
        tableName: "tbl_payments",
    }
);

module.exports = Payment;
