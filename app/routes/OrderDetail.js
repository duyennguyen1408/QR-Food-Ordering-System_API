// our components
const OrderDetailCtrl = require("../controllers/OrderDetailCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");
const KitchenMiddleware = require("../middlewares/KitchenMiddleware");

module.exports = function (app) {
    app.get("/v1/order-details/:id", OrderDetailCtrl.getOne);
    app.get(
        "/v1/auth/order-details",
        KitchenMiddleware,
        OrderDetailCtrl.getAll
    );
    app.post("/v1/order-details", OrderDetailCtrl.create);
    app.put(
        "/v1/auth/order-details/:id",
        ManagerMiddleware,
        OrderDetailCtrl.update
    );
    app.delete(
        "/v1/auth/order-details/:id",
        ManagerMiddleware,
        OrderDetailCtrl.delete
    );
};
