// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Dish = require("../models/Dish");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "categoryId",
                "dishTitle",
                "dishDesc",
                "dishPrice",
                "itemImageUrl",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Dish.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_dish", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_dish_fail", 400, error, null);
        }
    },

    getAll: function (categoryId, callback) {
        try {
            let attributes = [
                "id",
                "categoryId",
                "dishTitle",
                "dishDesc",
                "dishPrice",
                "itemImageUrl",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (categoryId) where.categoryId = categoryId;

            Dish.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(1, "find_all_dish_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "get_all_dish_fail", 400, error, null);
        }
    },

    update: function (dishId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = dishId;
            queryObj.categoryId = updatedData.categoryId;
            queryObj.dishTitle = updatedData.dishTitle;
            queryObj.dishDesc = updatedData.dishDesc;
            queryObj.dishPrice = updatedData.dishPrice;
            queryObj.itemImageUrl = updatedData.itemImageUrl;
            queryObj.updatedAt = new Date();

            Dish.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, dishId);
                    } else {
                        return callback(1, "update_dish_fail", 400, "", null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_dish_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_dish_fail", 400, error, null);
        }
    },

    delete: function (dishId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: dishId };
            queryObj = { deleted: Constant.DELETED.YES };

            Dish.findOne({ where: where })
                .then((currDish) => {
                    "use strict";
                    if (currDish && currDish.deleted === Constant.DELETED.YES) {
                        Dish.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_dish_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Dish.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_dish_fail",
                                    420,
                                    error
                                );
                            });
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "find_one_dish_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "delete_dish_fail", 400, error);
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

            Dish.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(1, "invalid_dish_request", 404, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_dish_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_dish_fail", 400, error);
        }
    },

    create: function (dishData, callback) {
        try {
            let queryObj = {};
            queryObj.categoryId = dishData.categoryId;
            queryObj.dishTitle = dishData.dishTitle;
            queryObj.dishDesc = dishData.dishDesc;
            queryObj.dishPrice = dishData.dishPrice;
            queryObj.itemImageUrl = dishData.itemImageUrl;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            Dish.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_dish_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_dish_fail", 400, error, null);
        }
    },
};
