// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const Config = require("../configs/Database.js");
const OrderManager = require("../manager/OrderManager.js");
const Rest = require("../utils/Restware");
const Order = require("../models/Order.js");

module.exports = {
    getOne: function (req, res) {
        const orderId = req.params.id || "";

        OrderManager.getOne(
            orderId,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                result
            ) {
                if (errorCode) {
                    return Rest.sendError(
                        res,
                        errorCode,
                        errorMessage,
                        httpCode,
                        errorDescription
                    );
                }

                return Rest.sendSuccessOne(res, result, httpCode);
            }
        );
    },

    getAll: function (req, res) {
        let tableId =
            (req.query && req.query.tableId) ||
            (req.body && req.body.tableId) ||
            "";

        OrderManager.getAll(
            tableId,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                results
            ) {
                if (errorCode) {
                    return Rest.sendError(
                        res,
                        errorCode,
                        errorMessage,
                        httpCode,
                        errorDescription
                    );
                }
                return Rest.sendSuccessMany(res, results, httpCode);
            }
        );
    },

    create: function (req, res) {
        let data = req.body || "";

        OrderManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                order
            ) {
                if (errorCode) {
                    return Rest.sendError(
                        res,
                        errorCode,
                        errorMessage,
                        httpCode,
                        errorDescription
                    );
                }
                let resData = {};
                resData.id = order.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let orderId = req.params.id || "";

        if (orderId === "deletes") {
            let ids = req.body.ids || "";

            OrderManager.deletes(
                ids,
                function (errorCode, errorMessage, httpCode, errorDescription) {
                    if (errorCode) {
                        return Rest.sendError(
                            res,
                            errorCode,
                            errorMessage,
                            httpCode,
                            errorDescription
                        );
                    }
                    return Rest.sendSuccessOne(res, null, httpCode);
                }
            );
        } else {
            let data = req.body || "";
            OrderManager.update(
                orderId,
                data,
                function (
                    errorCode,
                    errorMessage,
                    httpCode,
                    errorDescription,
                    result
                ) {
                    if (errorCode) {
                        return Rest.sendError(
                            res,
                            errorCode,
                            errorMessage,
                            httpCode,
                            errorDescription
                        );
                    }
                    let resData = {};
                    resData.id = orderId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let orderId = req.params.id || "";

        OrderManager.delete(
            orderId,
            function (errorCode, errorMessage, httpCode, errorDescription) {
                if (errorCode) {
                    return Rest.sendError(
                        res,
                        errorCode,
                        errorMessage,
                        httpCode,
                        errorDescription
                    );
                }
                let resData = {};
                resData.id = orderId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
