// Required third-party components
const qr = require("qr-image");
const Sequelize = require("sequelize");
const moment = require("moment");

// Our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");
const Table = require("../models/Table");

module.exports = {
    getOne: function (accessUserId, accessUserRole, id, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "tableName",
                "qrCode",
                "zone",
                "tableCapacity",
                "deleted",
                "createdAt",
                "updatedAt",
                "qrCodeExpiresAt",
            ];
            Table.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_table", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_table_fail", 400, error, null);
        }
    },

    getAll: function (accessUserId, accessUserRole, coffeeShopId, callback) {
        try {
            let attributes = [
                "id",
                "coffeeShopId",
                "tableName",
                "qrCode",
                "zone",
                "tableCapacity",
                "deleted",
                "createdAt",
                "updatedAt",
                "qrCodeExpiresAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;
            if (coffeeShopId) where.coffeeShopId = coffeeShopId;

            Table.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    return callback(1, "find_all_table_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "get_all_table_fail", 400, error, null);
        }
    },

    update: function (
        accessUserId,
        accessUserRole,
        tableId,
        updatedData,
        callback
    ) {
        try {
            let queryObj = {};
            let where = {};

            where.id = tableId;
            queryObj.coffeeShopId = updatedData.coffeeShopId;
            queryObj.tableName = updatedData.tableName;
            queryObj.qrCode = updatedData.qrCode;
            queryObj.zone = updatedData.zone;
            queryObj.tableCapacity = updatedData.tableCapacity;
            queryObj.updatedAt = new Date();
            queryObj.qrCodeExpiresAt = moment(queryObj.updatedAt)
                .add(1, "hours")
                .toDate();

            Table.update(queryObj, { where: where })
                .then((result) => {
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, tableId);
                    } else {
                        return callback(1, "update_table_fail", 400, "", null);
                    }
                })
                .catch(function (error) {
                    return callback(1, "update_table_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_table_fail", 400, error, null);
        }
    },

    delete: function (accessUserId, accessUserRole, tableId, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: tableId };
            queryObj = { deleted: Constant.DELETED.YES };

            Table.findOne({ where: where })
                .then((currTable) => {
                    if (
                        currTable &&
                        currTable.deleted === Constant.DELETED.YES
                    ) {
                        Table.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_table_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        Table.update(queryObj, { where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_table_fail",
                                    420,
                                    error
                                );
                            });
                    }
                })
                .catch(function (error) {
                    return callback(1, "find_one_table_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "delete_table_fail", 400, error);
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

            Table.update(queryObj, { where: where })
                .then((result) => {
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(1, "invalid_table_request", 404, null);
                    }
                })
                .catch(function (error) {
                    return callback(1, "update_table_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_table_fail", 400, error);
        }
    },

    create: function (accessUserId, accessUserRole, tableData, callback) {
        const generateQRCode = (data, callback) => {
            try {
                let qrCodeBuffer = qr.imageSync(data, {
                    type: "png",
                    errorCorrectionLevel: "H",
                    margin: 1,
                    size: 10,
                });
                let qrCodeBase64 = qrCodeBuffer.toString("base64");
                console.log("Generated QR Code Base64:", qrCodeBase64);
                callback(null, qrCodeBase64);
            } catch (err) {
                console.error("Error generating QR code:", err);
                callback(err, null);
            }
        };

        try {
            let queryObj = {
                coffeeShopId: tableData.coffeeShopId,
                tableName: tableData.tableName,
                zone: tableData.zone,
                tableCapacity: tableData.tableCapacity,
                deleted: Constant.DELETED.NO,
                createdAt: new Date(),
                updatedAt: new Date(),
                qrCodeExpiresAt: moment().add(1, "hours").toDate(),
            };

            const tempQRCodeData = `https://qr-food-ordering-system-d43yfytpl-quynh-duyens-projects.vercel.app/coffee-shops/${
                tableData.coffeeShopId
            }/tables/temp?table-name=${encodeURIComponent(
                tableData.tableName
            )}&zone=${encodeURIComponent(
                tableData.zone
            )}&capacity=${encodeURIComponent(tableData.tableCapacity)}`;

            generateQRCode(tempQRCodeData, function (err, qrCode) {
                if (err) {
                    return callback(
                        1,
                        "qr_code_generation_fail",
                        500,
                        err,
                        null
                    );
                }

                queryObj.qrCode = qrCode;

                Table.create(queryObj)
                    .then((result) => {
                        const tableId = result.id;

                        const finalQRCodeData = `https://qr-food-ordering-system-d43yfytpl-quynh-duyens-projects.vercel.app/coffee-shops/${
                            tableData.coffeeShopId
                        }/tables/${tableId}?table-name=${encodeURIComponent(
                            tableData.tableName
                        )}&zone=${encodeURIComponent(
                            tableData.zone
                        )}&capacity=${encodeURIComponent(
                            tableData.tableCapacity
                        )}`;

                        generateQRCode(
                            finalQRCodeData,
                            function (err, newQRCode) {
                                if (err) {
                                    return callback(
                                        1,
                                        "qr_code_generation_fail",
                                        500,
                                        err,
                                        null
                                    );
                                }

                                Table.update(
                                    { qrCode: newQRCode },
                                    { where: { id: tableId } }
                                )
                                    .then(() => {
                                        const response = {
                                            qrCode: newQRCode,
                                        };
                                        return callback(
                                            null,
                                            null,
                                            200,
                                            null,
                                            response
                                        );
                                    })
                                    .catch(function (error) {
                                        return callback(
                                            1,
                                            "update_qr_code_fail",
                                            420,
                                            error,
                                            null
                                        );
                                    });

                                setTimeout(function () {
                                    generateQRCode(
                                        finalQRCodeData,
                                        function (err, refreshedQRCode) {
                                            if (err) {
                                                console.error(
                                                    "Error generating new QR code:",
                                                    err
                                                );
                                            } else {
                                                Table.update(
                                                    { qrCode: refreshedQRCode },
                                                    { where: { id: tableId } }
                                                )
                                                    .then(() => {})
                                                    .catch((error) => {
                                                        console.error(
                                                            "Error updating QR code:",
                                                            error
                                                        );
                                                    });
                                            }
                                        }
                                    );
                                }, moment(queryObj.qrCodeExpiresAt).diff(
                                    moment(),
                                    "milliseconds"
                                ));
                            }
                        );
                    })
                    .catch(function (error) {
                        return callback(
                            1,
                            "create_table_fail",
                            420,
                            error,
                            null
                        );
                    });
            });
        } catch (error) {
            console.error("Error in try block:", error);
            return callback(1, "create_table_fail", 400, error, null);
        }
    },
};
