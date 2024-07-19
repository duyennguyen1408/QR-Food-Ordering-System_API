const TableCtrl = require("../controllers/TableCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");
const KitchenMiddleware = require("../middlewares/KitchenMiddleware");
module.exports = function (app) {
    app.get("/v1/auth/tables", KitchenMiddleware, TableCtrl.getAll);
    app.get("/v1/tables/:id", TableCtrl.getOne);
    app.post("/v1/auth/tables", ManagerMiddleware, TableCtrl.create);
    app.put("/v1/auth/tables/:id", ManagerMiddleware, TableCtrl.update);
    app.delete("/v1/auth/tables/:id", ManagerMiddleware, TableCtrl.delete);
};
