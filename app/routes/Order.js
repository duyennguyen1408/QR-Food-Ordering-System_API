// our components
const OrderCtrl = require("../controllers/OrderCtrl");
const KitchenMiddleware = require("../middlewares/KitchenMiddleware");

module.exports = function (app) {
    app.get("/v1/orders/:id", OrderCtrl.getOne);
    app.get("/v1/auth/orders", KitchenMiddleware, OrderCtrl.getAll);
    app.post("/v1/orders", OrderCtrl.create);
    app.put("/v1/auth/orders/:id", KitchenMiddleware, OrderCtrl.update);
    app.delete("/v1/auth/orders/:id", KitchenMiddleware, OrderCtrl.delete);
};
