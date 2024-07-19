// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const TableManager = require("../manager/TableManager.js");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        let accessUserId = req.query.accessUserId || "";
        let accessUserRole = req.query.accessUserRole || "";
        const tableId = req.params.id || "";

        TableManager.getOne(
            accessUserId,
            accessUserRole,
            tableId,
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

        TableManager.getAll(
            accessUserId,
            accessUserRole,
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
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";

        let data = req.body || "";

        TableManager.create(
            accessUserId,
            accessUserRole,
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                table
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
                resData.id = table.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";

        let tableId = req.params.id || "";

        if (tableId === "deletes") {
            let ids = req.body.ids || "";
            TableManager.deletes(
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
            TableManager.update(
                accessUserId,
                accessUserRole,
                tableId,
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
                    resData.id = tableId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let accessUserId = req.body.accessUserId || "";
        let accessUserRole = req.body.accessUserRole || "";
        let tableId = req.params.id || "";

        TableManager.delete(
            accessUserId,
            accessUserRole,
            tableId,
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
                resData.id = tableId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
