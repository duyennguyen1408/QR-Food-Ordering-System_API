// our components
const CoffeeShopCtrl = require("../controllers/CoffeeShopCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");

module.exports = function (app) {
    app.get("/v1/coffee-shops/:id", CoffeeShopCtrl.getOne);
    app.get("/v1/auth/coffee-shops", ManagerMiddleware, CoffeeShopCtrl.getAll);
    app.post("/v1/auth/coffee-shops", AdminMiddleware, CoffeeShopCtrl.create);
    app.put(
        "/v1/auth/coffee-shops/:id",
        AdminMiddleware,
        CoffeeShopCtrl.update
    );
    app.delete(
        "/v1/auth/coffee-shops/:id",
        AdminMiddleware,
        CoffeeShopCtrl.delete
    );
};
