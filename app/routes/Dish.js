// our components
const DishCtrl = require("../controllers/DishCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");

module.exports = function (app) {
    app.get("/v1/dishes/:id", DishCtrl.getOne);
    app.get("/v1/dishes", DishCtrl.getAll);
    app.post("/v1/auth/dishes", ManagerMiddleware, DishCtrl.create);
    app.put("/v1/auth/dishes/:id", ManagerMiddleware, DishCtrl.update);
    app.delete("/v1/auth/dishes/:id", ManagerMiddleware, DishCtrl.delete);
};
