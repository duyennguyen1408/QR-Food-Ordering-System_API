/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const BCrypt = require("bcryptjs");
const Validator = require("validator");
const Sequelize = require("sequelize");

// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Customer = require("../models/Customer");
module.exports = {
    getOne: function (accessUserId, accessUserRole, id, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "fullName",
                "phoneNumber",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Customer.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_customer", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_customer_fail", 400, error, null);
        }
    },

    getAll: function (coffeeShopId, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "fullName",
                "phoneNumber",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            if (coffeeShopId) where.coffeeShopId = coffeeShopId;

            Customer.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    // console.log(error);
                    return callback(
                        1,
                        "find_all_customer_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_customer_fail", 400, error, null);
        }
    },

    update: function (
        accessUserId,
        accessUserRole,
        customerId,
        updateData,
        callback
    ) {
        try {
            let queryObj = {};
            let where = {};

            where.id = customerId;
            queryObj.coffeeShopId = updateData.coffeeShopId;
            queryObj.fullName = updateData.fullName;
            queryObj.phoneNumber = updateData.phoneNumber;
            queryObj.updatedAt = new Date();

            Customer.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, customerId);
                    } else {
                        return callback(
                            1,
                            "update_customer_fail",
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
                        "update_customer_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_customer_fail", 400, error, null);
        }
    },

    delete: function (accessUserId, accessUserRole, id, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: id };
            queryObj = { deleted: Constant.DELETED.YES };

            Customer.findOne({ where: where })
                .then((currCustomer) => {
                    "use strict";
                    if (
                        currCustomer &&
                        currCustomer.deleted === Constant.DELETED.YES
                    ) {
                        Customer.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_customer_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Customer.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_customer_fail",
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
                        "find_one_customer_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_customer_fail", 400, error);
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

            Customer.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_customer_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_customer_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_customer_fail", 400, error);
        }
    },

    create: function (customerData, callback) {
        try {
            let queryObj = {};
            queryObj.coffeeShopId = customerData.coffeeShopId;
            queryObj.fullName = customerData.fullName;
            queryObj.phoneNumber = customerData.phoneNumber;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            Customer.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_customer_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_customer_fail", 400, error, null);
        }
    },
};
