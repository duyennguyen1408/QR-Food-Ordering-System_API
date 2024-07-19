// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const ComboDetail = require("../models/ComboDetail");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "comboId",
                "dishId",
                "quantity",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            ComboDetail.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_combo_detail", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_combo_detail_fail", 400, error, null);
        }
    },

    getAll: function (comboId, callback) {
        try {
            let attributes = [
                "id",
                "comboId",
                "dishId",
                "quantity",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (comboId) where.comboId = comboId;

            ComboDetail.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_combo_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_combo_detail_fail", 400, error, null);
        }
    },

    update: function (comboDetailId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = comboDetailId;
            queryObj.comboId = updatedData.comboId;
            queryObj.dishId = updatedData.dishId;
            queryObj.quantity = updatedData.quantity;
            queryObj.updatedAt = new Date();

            ComboDetail.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, comboDetailId);
                    } else {
                        return callback(
                            1,
                            "update_combo_detail_fail",
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
                        "update_combo_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_combo_detail_fail", 400, error, null);
        }
    },

    delete: function (comboDetailId, callback) {
        try {
            let where = { id: comboDetailId };

            ComboDetail.destroy({ where: where })
                .then((result) => {
                    if (result) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "remove_combo_detail_fail",
                            400,
                            "No combo detail found to delete",
                            null
                        );
                    }
                })
                .catch((error) => {
                    return callback(
                        1,
                        "remove_combo_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_combo_detail_fail", 400, error);
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

            ComboDetail.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_combo_detail_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_combo_detail_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_combo_detail_fail", 400, error);
        }
    },

    create: function (comboDetailData, callback) {
        try {
            let queryObj = {};
            queryObj.comboId = comboDetailData.comboId;
            queryObj.dishId = comboDetailData.dishId;
            queryObj.quantity = comboDetailData.quantity;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            ComboDetail.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_combo_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_combo_detail_fail", 400, error, null);
        }
    },
};
