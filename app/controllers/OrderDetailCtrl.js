// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const OrderDetailManager = require("../manager/OrderDetailManager");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        const orderDetailId = req.params.id || "";

        OrderDetailManager.getOne(
            orderDetailId,
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
        let orderId =
            (req.query && req.query.orderId) ||
            (req.body && req.body.orderId) ||
            "";

        OrderDetailManager.getAll(
            orderId,
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

        OrderDetailManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                orderDetail
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
                resData.id = orderDetail.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let orderDetailId = req.params.id || "";

        if (orderDetailId === "deletes") {
            let ids = req.body.ids || "";

            OrderDetailManager.deletes(
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
            OrderDetailManager.update(
                orderDetailId,
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
                    resData.id = orderDetailId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let orderDetailId = req.params.id || "";

        OrderDetailManager.delete(
            orderDetailId,
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
                resData.id = orderDetailId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
