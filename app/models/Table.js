const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let Table = MySequelize.define(
    "tbl_tables",
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
        tableName: {
            field: "table_name",
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        qrCode: {
            field: "qr_code",
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
        },
        zone: {
            field: "zone",
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        tableCapacity: {
            field: "table_capacity",
            type: Sequelize.INTEGER(11),
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
        qrCodeExpiresAt: {
            field: "qr_code_expires_at",
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
        tableName: "tbl_tables",
    }
);

module.exports = Table;
