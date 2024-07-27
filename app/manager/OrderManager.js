// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Order = require("../models/Order");
const { sendNotification } = require("../../server");
module.exports = {
    getOne: function (id, callback) {
        try {
            let attributes = [
                "id",
                "tableId",
                "orderDate",
                "totalPrice",
                "status",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            Order.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_order", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_order_fail", 400, error, null);
        }
    },

    getAll: function (tableId, callback) {
        try {
            let attributes = [
                "id",
                "tableId",
                "orderDate",
                "totalPrice",
                "status",
                "deleted",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (tableId) where.tableId = tableId;

            Order.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(1, "find_all_order_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "get_all_order_fail", 400, error, null);
        }
    },

    update: function (orderId, updatedData, callback) {
        try {
            let queryObj = {};
            let where = {};

            where.id = orderId;
            queryObj.tableId = updatedData.tableId;
            queryObj.totalPrice = updatedData.totalPrice;
            queryObj.status = updatedData.status;
            queryObj.updatedAt = new Date();

            // Store the current status for comparison later
            let currentStatus = null;
            console.log(`Updating order with ID: ${orderId}`);
            // Fetch the current status before updating
            Order.findOne({ where: { id: orderId } })
                .then((order) => {
                    if (order) {
                        console.log(`Current order status: ${order.status}`);
                        return Order.update(queryObj, {
                            where: { id: orderId },
                        });
                    } else {
                        throw new Error("Order not found");
                    }
                })
                .then((result) => {
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        console.log(
                            `Order updated successfully with ID: ${orderId}`
                        );
                        sendNotification("order_status_updated", {
                            orderId,
                            status: updatedData.status,
                        });
                        return callback(null, null, 200, null, orderId);
                    } else {
                        return callback(1, "update_order_fail", 400, "", null);
                    }
                })
                .catch((error) => {
                    console.error(`Error updating order: ${error.message}`);
                    return callback(1, "update_order_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_order_fail", 400, error, null);
        }
    },

    delete: function (orderId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: orderId };
            queryObj = { deleted: Constant.DELETED.YES };

            Order.findOne({ where: where })
                .then((currOrder) => {
                    "use strict";
                    if (
                        currOrder &&
                        currOrder.deleted === Constant.DELETED.YES
                    ) {
                        Order.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_order_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Order.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_order_fail",
                                    420,
                                    error
                                );
                            });
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "find_one_order_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "delete_order_fail", 400, error);
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

            Order.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(1, "invalid_order_request", 404, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_order_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_order_fail", 400, error);
        }
    },

    create: function (orderData, callback) {
        try {
            let queryObj = {};
            queryObj.tableId = orderData.tableId;
            queryObj.orderDate = new Date();
            queryObj.totalPrice = orderData.totalPrice;
            queryObj.status = orderData.status || "Confirmed";
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            console.log("Creating order with data:", queryObj);

            Order.create(queryObj)
                .then((result) => {
                    // Send Socket.IO notification
                    const notification = {
                        type: "NEW_ORDER",
                        data: result,
                    };
                    sendNotification("new_order", notification);

                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    console.error("Error creating order:", error);
                    return callback(1, "create_order_fail", 420, error, null);
                });
        } catch (error) {
            console.error("Error creating order:", error);
            return callback(1, "create_order_fail", 400, error, null);
        }
    },
};
