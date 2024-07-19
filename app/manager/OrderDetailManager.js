// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const OrderDetail = require("../models/OrderDetail");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "dishId",
                "comboId",
                "orderId",
                "quantity",
                "price",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            OrderDetail.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_order_detail", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_order_detail_fail", 400, error, null);
        }
    },

    getAll: function (orderId, callback) {
        try {
            let attributes = [
                "id",
                "dishId",
                "comboId",
                "orderId",
                "quantity",
                "price",

                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (orderId) where.orderId = orderId;

            OrderDetail.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_order_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_order_detail_fail", 400, error, null);
        }
    },

    update: function (orderDetailId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = orderDetailId;
            queryObj.dishId = updatedData.dishId;
            queryObj.comboId = updatedData.comboId;
            queryObj.orderId = updatedData.orderId;
            queryObj.quantity = updatedData.quantity;
            queryObj.price = updatedData.price;
            queryObj.updatedAt = new Date();

            OrderDetail.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, orderDetailId);
                    } else {
                        return callback(
                            1,
                            "update_order_detail_fail",
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
                        "update_order_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "update_order_detail_fail", 400, error, null);
        }
    },

    delete: function (orderDetailId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: orderDetailId };
            queryObj = { deleted: Constant.DELETED.YES };

            OrderDetail.findOne({ where: where })
                .then((currOrderDetail) => {
                    "use strict";
                    if (
                        currOrderDetail &&
                        currOrderDetail.deleted === Constant.DELETED.YES
                    ) {
                        OrderDetail.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_order_detail_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        OrderDetail.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_order_detail_fail",
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
                        "find_one_order_detail_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_order_detail_fail", 400, error);
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

            OrderDetail.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_order_detail_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_order_detail_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_order_detail_fail", 400, error);
        }
    },

    create: function (orderDetailData, callback) {
        try {
            let queryObj = {};
            queryObj.dishId = orderDetailData.dishId;
            queryObj.comboId = orderDetailData.comboId;
            queryObj.orderId = orderDetailData.orderId;
            queryObj.quantity = orderDetailData.quantity;
            queryObj.price = orderDetailData.price;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            OrderDetail.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(
                        1,
                        "create_order_detail_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "create_order_detail_fail", 400, error, null);
        }
    },
};
