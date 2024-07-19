// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const Config = require("../configs/Database.js");
const CustomerManager = require("../manager/Customer.js");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        let accessUserId = req.query.accessUserId || "";
        let accessUserRole = req.query.accessUserRole || "";
        const customerId = req.params.id || "";

        console.log(accessUserRole);
        CustomerManager.getOne(
            accessUserId,
            accessUserRole,
            customerId,
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
        let accessUserId = req.query.accessUserId || "";
        let accessUserRole = req.query.accessUserRole || "";
        let coffeeShopId =
            (req.query && req.query.coffeeShopId) ||
            (req.body && req.body.coffeeShopId) ||
            "";

        CustomerManager.getAll(
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

        CustomerManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                customer
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
                resData.id = customer.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";

        let customerId = req.params.id || "";

        if (customerId === "deletes") {
            let ids = req.body.ids || "";

            CustomerManager.deletes(
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
            CustomerManager.update(
                accessUserId,
                accessUserRole,
                customerId,
                data,
                function (
                    errorCode,
                    errorMessage,
                    httpCode,
                    errorDescription,
                    result
                ) {
                    // , accessUserRole
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
                    resData.id = customerId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";
        let customerId = req.params.id || "";

        CustomerManager.delete(
            accessUserId,
            accessUserRole,
            customerId,
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
                resData.id = customerId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
