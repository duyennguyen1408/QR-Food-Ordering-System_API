// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Category = require("../models/Category");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "categoryName",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Category.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_category", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_category_fail", 400, error, null);
        }
    },

    getAll: function (coffeeShopId, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "categoryName",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (coffeeShopId) where.coffeeShopId = coffeeShopId;

            Category.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_category_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_category_fail", 400, error, null);
        }
    },

    update: function (categoryId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = categoryId;
            queryObj.coffeeShopId = updatedData.coffeeShopId;
            queryObj.categoryName = updatedData.categoryName;
            queryObj.updatedAt = new Date();

            Category.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, categoryId);
                    } else {
                        return callback(
                            1,
                            "update_category_fail",
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
                        "update_category_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_category_fail", 400, error, null);
        }
    },

    delete: function (categoryId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: categoryId };
            queryObj = { deleted: Constant.DELETED.YES };

            Category.findOne({ where: where })
                .then((currCategory) => {
                    "use strict";
                    if (
                        currCategory &&
                        currCategory.deleted === Constant.DELETED.YES
                    ) {
                        Category.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_category_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Category.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_category_fail",
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
                        "find_one_category_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_category_fail", 400, error);
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

            Category.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_category_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_category_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_category_fail", 400, error);
        }
    },

    create: function (categoryData, callback) {
        try {
            let queryObj = {};
            queryObj.coffeeShopId = categoryData.coffeeShopId;
            queryObj.categoryName = categoryData.categoryName;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            Category.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_category_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_category_fail", 400, error, null);
        }
    },
};
