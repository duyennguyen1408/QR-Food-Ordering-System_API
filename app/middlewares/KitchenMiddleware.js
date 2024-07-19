// Third-party components
const JsonWebToken = require("jsonwebtoken");

// Our components
const Config = require("../configs/Database");
const UserManager = require("../manager/UserManager");
const Rest = require("../utils/Restware");
const Constant = require("../utils/Constant");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next(); // Skip this middleware for OPTIONS requests (used for CORS preflight checks).
    }

    let token =
        (req.body && req.body.access_token) || // Try to find the token in the request body
        req.headers["access_token"] || // or headers
        (req.query && req.query.access_token); // or query string

    // console.log(token);

    if (token) {
        try {
            JsonWebToken.verify(
                token,
                Config.jwtAuthKey,
                function (error, decoded) {
                    if (error) {
                        // Handle JWT verification error
                        return Rest.sendError(
                            res,
                            70,
                            "verify_token_fail",
                            400,
                            error
                        );
                    }

                    if (decoded.userRole < Constant.USER_ROLE.WAITER) {
                        // Check if user role is "admin", "manager", "baker", "barista", "waiter"
                        return Rest.sendError(
                            res,
                            403,
                            "unauthorized",
                            403,
                            "User is not authorized (requires admin, manager, baker, barista, waiter role)"
                        );
                    }

                    UserManager.verifyUser(
                        decoded.id,
                        decoded.userRole,
                        decoded.username,
                        function (
                            errorCode,
                            errorMessage,
                            httpCode,
                            errorDescription,
                            result
                        ) {
                            if (errorCode) {
                                return Rest.sendError(
                                    res,
                                    errorCode,
                                    errorMessage,
                                    httpCode,
                                    errorDescription
                                );
                            }

                            // Since user is verified as admin/manager/baker/barista/waiter, continue processing the request (original logic)
                            if (req.method === "GET") {
                                req.query.accessUserId = decoded.id;
                                req.query.accessUserRole = decoded.userRole;
                                req.query.accessUsername = decoded.username;
                            } else {
                                req.body.accessUserId = decoded.id;
                                req.body.accessUserRole = decoded.userRole;
                                req.body.accessUsername = decoded.username;
                            }

                            next();
                        }
                    );
                }
            );
        } catch (error) {
            return Rest.sendError(res, 4170, "system", 400, error); // Catch unexpected errors
        }
    } else {
        return Rest.sendError(res, 4178, "invalid_token", 400, null); // Handle missing token
    }
};
