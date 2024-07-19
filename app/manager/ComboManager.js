// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Combo = require("../models/Combo");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "comboName",
                "comboDesc",
                "comboPrice",
                "comboImageUrl",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Combo.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_combo", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_combo_fail", 400, error, null);
        }
    },

    getAll: function (query, callback) {
        try {
            let attributes = [
                "id",
                "comboName",
                "comboDesc",
                "comboPrice",
                "comboImageUrl",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            Combo.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    // console.log(error);
                    return callback(1, "find_all_combo_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "get_all_combo_fail", 400, error, null);
        }
    },

    update: function (comboId, updateData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = comboId;
            queryObj.comboName = updateData.comboName;
            queryObj.comboDesc = updateData.comboDesc;
            queryObj.comboPrice = updateData.comboPrice;
            queryObj.comboImageUrl = updateData.comboImageUrl;
            queryObj.updatedAt = new Date();

            Combo.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, comboId);
                    } else {
                        return callback(1, "update_combo_fail", 400, "", null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_combo_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_combo_fail", 400, error, null);
        }
    },

    delete: function (comboId, callback) {
        try {
            let where = { id: comboId };

            Combo.destroy({ where: where })
                .then((result) => {
                    if (result) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "remove_combo_fail",
                            400,
                            "No combo found to delete",
                            null
                        );
                    }
                })
                .catch((error) => {
                    return callback(1, "remove_combo_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "delete_combo_fail", 400, error);
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

            Combo.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(1, "invalid_combo_request", 404, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_combo_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_combo_fail", 400, error);
        }
    },

    create: function (comboData, callback) {
        try {
            let queryObj = {};
            queryObj.comboName = comboData.comboName;
            queryObj.comboDesc = comboData.comboDesc;
            queryObj.comboPrice = comboData.comboPrice;
            queryObj.comboImageUrl = comboData.comboImageUrl;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            Combo.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_combo_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_combo_fail", 400, error, null);
        }
    },
};
