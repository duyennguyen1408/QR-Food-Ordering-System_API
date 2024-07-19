// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const CoffeeShopManager = require("../manager/CoffeeShopManager.js");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        const coffeeShopId = req.params.id || "";

        CoffeeShopManager.getOne(
            coffeeShopId,
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
        let query = req.query || "";

        CoffeeShopManager.getAll(
            query,
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
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";

        let data = req.body || "";

        CoffeeShopManager.create(
            accessUserId,
            accessUserRole,
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                coffeeShop
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
                resData.id = coffeeShop.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";

        let coffeeShopId = req.params.id || "";

        if (coffeeShopId === "deletes") {
            let ids = req.body.ids || "";

            CoffeeShopManager.deletes(
                accessUserId,
                accessUserRole,
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
            CoffeeShopManager.update(
                accessUserId,
                accessUserRole,
                coffeeShopId,
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
                    resData.id = coffeeShopId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";
        let coffeeShopId = req.params.id || "";

        CoffeeShopManager.delete(
            accessUserId,
            accessUserRole,
            coffeeShopId,
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
                resData.id = coffeeShopId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
