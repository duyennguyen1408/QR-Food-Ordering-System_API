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

const User = require("../models/Users");
module.exports = {
    getOne: function (accessUserId, accessUserRole, id, callback) {
        try {
            let attributes = [
                "id",
                "username",
                "fullName",
                "phoneNumber",
                "userRole",
                "createdAt",
                "updatedAt",
            ];
            User.findOne({
                where: { id: id },
                attributes: attributes,
            }).then((result) => {
                "use strict";
                if (result) {
                    return callback(null, null, 200, null, result);
                } else {
                    return callback(1, "invalid_user", 403, null, null);
                }
            });
        } catch (error) {
            return callback(1, "get_one_user_fail", 400, error, null);
        }
    },

    getStatistic: function (accessUserId, accessUserRole, callback) {
        try {
            let final = {};
            final = { activated: 0, total: 0 };
            User.count({
                where: {},
            })
                .then(function (total) {
                    "use strict";
                    final.total = total;
                    User.count({
                        where: { activated: 1 },
                    })
                        .then(function (activated) {
                            final.activated = activated;
                            return callback(null, null, 200, null, final);
                        })
                        .catch(function (error) {
                            "use strict";
                            return callback(
                                1,
                                "count_user_fail",
                                400,
                                error,
                                null
                            );
                        });
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "count_user_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "statistic_user_fail", 400, error, null);
        }
    },

    getAll: function (accessUserId, accessUserRole, query, callback) {
        try {
            let attributes = [
                "id",
                "username",
                "fullName",
                "phoneNumber",
                "userRole",
                "createdAt",
                "updatedAt",
            ];
            let where = {};
            where.deleted = Constant.DELETED.NO;

            User.findAndCountAll({
                attributes: attributes,
                where: where,
            })
                .then((result) => {
                    // console.log(result);;
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    // console.log(error);
                    return callback(1, "find_all_user_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "get_all_user_fail", 400, error, null);
        }
    },

    update: function (
        accessUserId,
        accessUserRole,
        userId,
        updateData,
        callback
    ) {
        try {
            let queryObj = {};
            let where = {};

            where.id = userId;
            queryObj.username = updateData.username;
            queryObj.fullName = updateData.fullName;
            queryObj.phoneNumber = updateData.phoneNumber;
            queryObj.userRole = updateData.userRole;
            queryObj.updatedAt = new Date();

            User.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result !== null && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null, userId);
                    } else {
                        return callback(1, "update_user_fail", 400, "", null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_user_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "update_user_fail", 400, error, null);
        }
    },

    delete: function (accessUserId, accessUserRole, id, callback) {
        try {
            let queryObj = {};
            let where = {};

            where = { id: id };
            queryObj = { deleted: Constant.DELETED.YES };

            User.findOne({ where: where })
                .then((account) => {
                    "use strict";
                    if (account && account.deleted === Constant.DELETED.YES) {
                        User.destroy({ where: where })
                            .then((result) => {
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "remove_user_fail",
                                    420,
                                    error
                                );
                            });
                    } else {
                        User.update(queryObj, { where: where })
                            .then((result) => {
                                "use strict";
                                return callback(null, null, 200, null);
                            })
                            .catch(function (error) {
                                return callback(
                                    1,
                                    "update_user_fail",
                                    420,
                                    error
                                );
                            });
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "find_one_user_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "delete_user_fail", 400, error);
        }
    },

    deletes: function (accessUserId, accessUserRole, ids, callback) {
        try {
            let idList = Pieces.safelyParseJSON(ids);
            let where = { id: idList };

            let queryObj = {
                deleted: Constant.DELETED.YES,
                updatedAt: new Date(),
            };

            User.update(queryObj, { where: where })
                .then((result) => {
                    "use strict";
                    if (result && result.length > 0 && result[0] > 0) {
                        return callback(null, null, 200, null);
                    } else {
                        return callback(1, "invalid_user_request", 404, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "update_user_fail", 420, error);
                });
        } catch (error) {
            return callback(1, "deletes_user_fail", 400, error);
        }
    },

    verifyUser: function (
        accessUserId,
        accessUserRole,
        accessLoginName,
        callback
    ) {
        try {
            let where = {
                id: accessUserId,
                username: accessLoginName,
                userRole: accessUserRole,
                activated: Constant.ACTIVATED.YES,
            };
            let attributes = [
                "id",
                "username",
                "password",
                "fullName",
                "phoneNumber",
                "userRole",
                "createdAt",
                "updatedAt",
            ];

            User.findOne({
                where: where,
                attributes: attributes,
            })
                .then((result) => {
                    "use strict";
                    if (result) {
                        return callback(null, null, 200, null, result);
                    } else {
                        return callback(1, "invalid_user", 403, null, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "find_one_user_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "find_one_user_fail", 400, error, null);
        }
    },

    authenticate: function (loginName, password, callback) {
        try {
            if (!Pieces.VariableBaseTypeChecking(loginName, "string")) {
                return callback(
                    1,
                    "invalid_user_login_name",
                    422,
                    "login name is not a string",
                    null
                );
            }

            if (!Pieces.VariableBaseTypeChecking(password, "string")) {
                return callback(
                    1,
                    "invalid_user_password",
                    422,
                    "password is not a string",
                    null
                );
            }

            let where = { username: loginName };
            let attributes = [
                "id",
                "username",
                "password",
                "fullName",
                "phoneNumber",
                "userRole",
                "activated",
                "deleted",
            ];

            User.findOne({
                where: where,
                attributes: attributes,
            })
                .then((account) => {
                    "use strict";
                    if (account) {
                        if (account.activated === Constant.ACTIVATED.NO) {
                            return callback(
                                1,
                                "unactivated_user",
                                404,
                                null,
                                null
                            );
                        } else {
                            BCrypt.compare(
                                password,
                                account.password,
                                function (error, result) {
                                    if (result === true) {
                                        return callback(
                                            null,
                                            null,
                                            200,
                                            null,
                                            account
                                        );
                                    } else {
                                        return callback(
                                            1,
                                            "wrong_password",
                                            422,
                                            null,
                                            null
                                        );
                                    }
                                }
                            );
                        }
                    } else {
                        return callback(1, "invalid_user", 404, null, null);
                    }
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "find_one_user_fail", 400, error, null);
                });
        } catch (error) {
            return callback(1, "authenticate_user_fail", 400, error, null);
        }
    },

    create: function (userData, callback) {
        try {
            let queryObj = {};
            queryObj.username = userData.username;
            queryObj.password = BCrypt.hashSync(userData.password, 10);
            queryObj.phoneNumber = userData.phoneNumber;
            queryObj.fullName = userData.fullName;
            queryObj.userRole = Constant.USER_ROLE.ADMIN;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            if (
                userData.activated === Constant.ACTIVATED.YES ||
                userData.activated === Constant.ACTIVATED.NO
            ) {
                queryObj.activated = userData.activated;
            } else {
                queryObj.activated = Constant.ACTIVATED.YES;
            }

            User.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_user_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_user_fail", 400, error, null);
        }
    },

    createManager: function (userData, callback) {
        try {
            let queryObj = {};
            queryObj.username = userData.username;
            queryObj.password = BCrypt.hashSync(userData.password, 10);
            queryObj.phoneNumber = userData.phoneNumber;
            queryObj.fullName = userData.fullName;
            queryObj.userRole = Constant.USER_ROLE.MANAGER;
            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            if (
                userData.activated === Constant.ACTIVATED.YES ||
                userData.activated === Constant.ACTIVATED.NO
            ) {
                queryObj.activated = userData.activated;
            } else {
                queryObj.activated = Constant.ACTIVATED.YES;
            }

            User.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_user_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_user_fail", 400, error, null);
        }
    },
    createStaff: function (userData, callback) {
        try {
            let queryObj = {};
            queryObj.username = userData.username;
            queryObj.password = BCrypt.hashSync(userData.password, 10);
            queryObj.phoneNumber = userData.phoneNumber;
            queryObj.fullName = userData.fullName;
            queryObj.userRole = userData.userRole;

            if (queryObj.userRole === Constant.USER_ROLE.BARISTA) {
                queryObj.userRole = Constant.USER_ROLE.MANAGER;
            } else if (queryObj.userRole === Constant.USER_ROLE.WAITER) {
                queryObj.userRole = Constant.USER_ROLE.WAITER;
            } else if (queryObj.userRole === Constant.USER_ROLE.BAKER) {
                queryObj.userRole = Constant.USER_ROLE.BAKER;
            }

            queryObj.deleted = Constant.DELETED.NO;
            queryObj.createdAt = new Date();
            queryObj.updatedAt = new Date();

            if (
                userData.activated === Constant.ACTIVATED.YES ||
                userData.activated === Constant.ACTIVATED.NO
            ) {
                queryObj.activated = userData.activated;
            } else {
                queryObj.activated = Constant.ACTIVATED.YES;
            }

            User.create(queryObj)
                .then((result) => {
                    "use strict";
                    return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                    "use strict";
                    return callback(1, "create_user_fail", 420, error, null);
                });
        } catch (error) {
            return callback(1, "create_user_fail", 400, error, null);
        }
    },
};
