// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Payment = require("../models/Payment");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "orderId",
                "paymentDesc",
                "paymentMethod",
                "status",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Payment.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_payment", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_payment_fail", 400, error, null);
        }
    },

    getAll: function (orderId, callback) {
        try {
            let attributes = [
                "id",
                "orderId",
                "paymentDesc",
                "paymentMethod",
                "status",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (orderId) where.orderId = orderId;

            Payment.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "find_all_payment_fail",
                        420,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "get_all_payment_fail", 400, error, null);
        }
    },

    update: function (paymentId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = paymentId;
            queryObj.orderId = updatedData.orderId;
            queryObj.paymentDesc = updatedData.paymentDesc;
            queryObj.paymentMethod = updatedData.paymentMethod;
            queryObj.status = updatedData.status;
            queryObj.updatedAt = new Date();

            Payment.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, paymentId);
                    } else {
                        return callback(
                            1,
                            "update_payment_fail",
                            400,
                            "",
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_payment_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_payment_fail", 400, error, null);
        }
    },

    delete: function (paymentId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: paymentId };
            queryObj = { deleted: Constant.DELETED.YES };

            Payment.findOne({ where: where })
                .then((currPayment) => {
                    "use strict";
                    if (
                        currPayment &&
                        currPayment.deleted === Constant.DELETED.YES
                    ) {
                        OrderDetail.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_payment_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Payment.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_payment_fail",
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
                        "find_one_payment_fail",
                        400,
                        error,
                        null
                    );
                });
        } catch (error) {
            return callback(1, "delete_payment_fail", 400, error);
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

            Payment.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(
                            1,
                            "invalid_payment_request",
                            404,
                            null
                        );
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_payment_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_payment_fail", 400, error);
        }
    },

    create: function (paymentData, callback) {
        try {
            let queryObj = {};
            queryObj.orderId = paymentData.orderId;
            queryObj.paymentDesc = paymentData.paymentDesc;
            queryObj.paymentMethod = paymentData.paymentMethod;
            queryObj.status = paymentData.status;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            Payment.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_payment_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_payment_fail", 400, error, null);
        }
    },
};
