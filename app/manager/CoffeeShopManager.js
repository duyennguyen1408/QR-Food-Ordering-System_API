// third party components
const BCrypt = require("bcryptjs");
const Validator = require("validator");
const Sequelize = require("sequelize");

// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const CoffeeShop = require("../models/CoffeeShop");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "managerId",
                "coffeeShopName",
                "coffeeShopDesc",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            CoffeeShop.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_coffee_shop", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_coffee_shop_fail", 400, error, null);
        }
    },

    getAll: function (query, callback) {
        try {
            let attributes = [
                "id",
                "managerId",
                "coffeeShopName",
                "coffeeShopDesc",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;

            CoffeeShop.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_coffee_shop_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_coffee_shop_fail", 400, error, null);
        }
    },

    update: function (
        accessUserId,
        accessUserRole,
        coffeeShopId,
        updatedData,
        callback
    ) {
        try {
            let queryObj = {};
            let where = {};

            where.id = coffeeShopId;
            queryObj.managerId = updatedData.managerId;
            queryObj.coffeeShopName = updatedData.coffeeShopName;
            queryObj.coffeeShopDesc = updatedData.coffeeShopDesc;
            queryObj.updatedAt = new Date();

            CoffeeShop.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, coffeeShopId);
                    } else {
                        return callback(
                            1,
                            "update_coffee_shop_fail",
                            400,
                            "",
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "update_coffee_shop_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_coffee_shop_fail", 400, error, null);
        }
    },

    delete: function (accessUserId, accessUserRole, coffeeShopId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: coffeeShopId };
            queryObj = { deleted: Constant.DELETED.YES };

            CoffeeShop.findOne({ where: where })
                .then((currCoffeeShop) => {
                    "use strict";
                    if (
                        currCoffeeShop &&
                        currCoffeeShop.deleted === Constant.DELETED.YES
                    ) {
                        CoffeeShop.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_coffee_shop_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        CoffeeShop.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_coffee_shop_fail",
                                    420,
                                    error
                                );
                            });
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "find_one_coffee_shop_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_coffee_shop_fail", 400, error);
        }
    },

    deletes: function (accessUserId, accessUserRole, ids, callback) {
        try {
            let idLists = Pieces.safelyParseJSON(ids);
            let where = {
                id: idLists,
                userRole: accessUserRole,
                system: Constant.SYSTEM.NO,
            };

            let queryObj = { deleted: Constant.DELETED.YES };

            CoffeeShop.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_coffee_shop_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_coffee_shop_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_coffee_shop_fail", 400, error);
        }
    },

    create: function (accessUserId, accessUserRole, coffeeShopData, callback) {
        try {
            let queryObj = {};
            queryObj.managerId = coffeeShopData.managerId;
            queryObj.coffeeShopName = coffeeShopData.coffeeShopName;
            queryObj.coffeeShopDesc = coffeeShopData.coffeeShopDesc;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            CoffeeShop.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_coffee_shop_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_coffee_shop_fail", 400, error, null);
        }
    },
};
