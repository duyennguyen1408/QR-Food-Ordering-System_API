// our components
const PaymentCtrl = require("../controllers/PaymentCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");

module.exports = function (app) {
    app.get("/v1/auth/payments/:id", ManagerMiddleware, PaymentCtrl.getOne);
    app.get("/v1/auth/payments", ManagerMiddleware, PaymentCtrl.getAll);
    app.post("/v1/payments", PaymentCtrl.create);
    app.put("/v1/auth/payments/:id", ManagerMiddleware, PaymentCtrl.update);
    app.delete("/v1/auth/payments/:id", ManagerMiddleware, PaymentCtrl.delete);
};
