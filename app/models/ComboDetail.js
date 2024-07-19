const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Constant = require("../utils/Constant");

let ComboDetail = MySequelize.define(
    "tbl_combo_details",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
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
        dishId: {
            field: "dish_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: this.Dish,
                key: "id",
            },
        },
        quantity: {
            field: "quantity",
            type: Sequelize.INTEGER,
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
        tableName: "tbl_combo_details",
    }
);

module.exports = ComboDetail;
