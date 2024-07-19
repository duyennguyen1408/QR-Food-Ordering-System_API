// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const PaymentManager = require("../manager/PaymentManager");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        const paymentId = req.params.id || "";

        PaymentManager.getOne(
            paymentId,
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

        PaymentManager.getAll(
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

        PaymentManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                payment
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
                resData.id = payment.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let paymentId = req.params.id || "";

        if (paymentId === "deletes") {
            let ids = req.body.ids || "";

            PaymentManager.deletes(
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
            PaymentManager.update(
                paymentId,
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
                    resData.id = paymentId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let paymentId = req.params.id || "";

        PaymentManager.delete(
            paymentId,
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
                resData.id = paymentId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
