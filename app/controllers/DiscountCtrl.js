// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const DiscountManager = require("../manager/DiscountManager");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        const discountId = req.params.id || "";

        DiscountManager.getOne(
            discountId,
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
        let coffeeShopId =
            (req.query && req.query.coffeeShopId) ||
            (req.body && req.body.coffeeShopId) ||
            "";

        DiscountManager.getAll(
            coffeeShopId,
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

        DiscountManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                discount
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
                resData.id = discount.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let discountId = req.params.id || "";

        if (discountId === "deletes") {
            let ids = req.body.ids || "";

            DiscountManager.deletes(
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
            DiscountManager.update(
                discountId,
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
                    resData.id = discountId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let discountId = req.params.id || "";

        DiscountManager.delete(
            discountId,
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
                resData.id = discountId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
