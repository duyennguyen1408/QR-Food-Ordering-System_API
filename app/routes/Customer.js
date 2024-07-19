const CustomerCtrl = require("../controllers/CustomerCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");
module.exports = function (app) {
    app.get("/v1/auth/customers", ManagerMiddleware, CustomerCtrl.getAll);
    app.get("/v1/customers/:id", CustomerCtrl.getOne);
    app.post("/v1/customers", CustomerCtrl.create);
    app.put("/v1/auth/customers/:id", ManagerMiddleware, CustomerCtrl.update);
    app.delete(
        "/v1/auth/customers/:id",
        ManagerMiddleware,
        CustomerCtrl.delete
    );
};
