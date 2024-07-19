// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Discount = require("../models/Discount");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "dishId",
                "comboId",
                "coffeeShopId",
                "discountValue",
                "deleted",
                "createdAt",
                "updatedAt",
                "validFrom",
                "validUntil",
            ];
            Discount.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_discount", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_discount_fail", 400, error, null);
        }
    },

    getAll: function (coffeeShopId, callback) {
        try {
            let attributes = [
                "id",
                "dishId",
                "comboId",
                "coffeeShopId",
                "discountValue",
                "deleted",
                "createdAt",
                "updatedAt",
                "validFrom",
                "validUntil",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (coffeeShopId) where.coffeeShopId = coffeeShopId;

            Discount.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_discount_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_discount_fail", 400, error, null);
        }
    },

    update: function (discountId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};
            where.id = discountId;
            queryObj.dishId = updatedData.dishId;
            queryObj.comboId = updatedData.comboId;
            queryObj.coffeeShopId = updatedData.coffeeShopId;
            queryObj.discountValue = updatedData.discountValue;
            queryObj.updatedAt = new Date();
            queryObj.validFrom = updatedData.validFrom;
            queryObj.validUntil = updatedData.validUntil;

            Discount.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, discountId);
                    } else {
                        return callback(
                            1,
                            "update_discount_fail",
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
                        "update_discount_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_discount_fail", 400, error, null);
        }
    },

    delete: function (discountId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: discountId };
            queryObj = { deleted: Constant.DELETED.YES };

            Discount.findOne({ where: where })
                .then((currDiscount) => {
                    "use strict";
                    if (
                        currDiscount &&
                        currDiscount.deleted === Constant.DELETED.YES
                    ) {
                        Discount.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_discount_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Discount.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_discount_fail",
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
                        "find_one_discount_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_discount_fail", 400, error);
        }
    },

    deletes: function (accessUserRole, ids, callback) {
        try {
            let idLists = Pieces.safelyParseJSON(ids);
            let where = {
                id: idLists,
                userRole: accessUserRole,
                system: Constant.SYSTEM.NO,
            };

            let queryObj = { deleted: Constant.DELETED.YES };

            Discount.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_discount_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_discount_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_discount_fail", 400, error);
        }
    },

    create: function (discountData, callback) {
        try {
            let queryObj = {};
            queryObj.dishId = discountData.dishId;
            queryObj.comboId = discountData.comboId;
            queryObj.coffeeShopId = discountData.coffeeShopId;
            queryObj.discountValue = discountData.discountValue;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();
            queryObj.validFrom = discountData.validFrom;
            queryObj.validUntil = discountData.validUntil;

            Discount.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_discount_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_discount_fail", 400, error, null);
        }
    },
};
