// our components
const ComboCtrl = require("../controllers/ComboCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");

module.exports = function (app) {
    app.get("/v1/combos/:id", ComboCtrl.getOne);
    app.get("/v1/combos", ComboCtrl.getAll);
    app.post("/v1/auth/combos", ManagerMiddleware, ComboCtrl.create);
    app.put("/v1/auth/combos/:id", ManagerMiddleware, ComboCtrl.update);
    app.delete("/v1/auth/combos/:id", ManagerMiddleware, ComboCtrl.delete);
};
