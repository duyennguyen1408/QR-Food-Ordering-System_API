// third party components
const JsonWebToken = require("jsonwebtoken");

// our components
const DishManager = require("../manager/DishManager.js");
const Rest = require("../utils/Restware");

module.exports = {
    getOne: function (req, res) {
        const dishId = req.params.id || "";

        DishManager.getOne(
            dishId,
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
        let categoryId =
            (req.query && req.query.categoryId) ||
            (req.body && req.body.categoryId) ||
            "";

        DishManager.getAll(
            categoryId,
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

        DishManager.create(
            data,
            function (
                errorCode,
                errorMessage,
                httpCode,
                errorDescription,
                dish
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
                resData.id = dish.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },

    update: function (req, res) {
        let dishId = req.params.id || "";

        if (dishId === "deletes") {
            let ids = req.body.ids || "";
            DishManager.deletes(
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
            DishManager.update(
                dishId,
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
                    resData.id = dishId;
                    return Rest.sendSuccessOne(res, resData, httpCode);
                }
            );
        }
    },

    delete: function (req, res) {
        let dishId = req.params.id || "";

        DishManager.delete(
            dishId,
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
                resData.id = dishId;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
};
