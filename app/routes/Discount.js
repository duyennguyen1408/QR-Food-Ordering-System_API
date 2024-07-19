// our components
const DiscountCtrl = require("../controllers/DiscountCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");

module.exports = function (app) {
    app.get("/v1/discounts/:id", DiscountCtrl.getOne);
    app.get("/v1/discounts", DiscountCtrl.getAll);
    app.post("/v1/auth/discounts", ManagerMiddleware, DiscountCtrl.create);
    app.put("/v1/auth/discounts/:id", ManagerMiddleware, DiscountCtrl.update);
    app.delete(
        "/v1/auth/discounts/:id",
        ManagerMiddleware,
        DiscountCtrl.delete
    );
};
