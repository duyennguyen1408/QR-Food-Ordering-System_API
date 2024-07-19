// our components
const ComboDetailCtrl = require("../controllers/ComboDetailCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");

module.exports = function (app) {
    app.get("/v1/combo-details/:id", ComboDetailCtrl.getOne);
    app.get("/v1/combo-details", ComboDetailCtrl.getAll);
    app.post(
        "/v1/auth/combo-details",
        ManagerMiddleware,
        ComboDetailCtrl.create
    );
    app.put(
        "/v1/auth/combo-details/:id",
        ManagerMiddleware,
        ComboDetailCtrl.update
    );
    app.delete(
        "/v1/auth/combo-details/:id",
        ManagerMiddleware,
        ComboDetailCtrl.delete
    );
};
