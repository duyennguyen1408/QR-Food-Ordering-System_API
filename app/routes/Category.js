const CategoryCtrl = require("../controllers/CategoryCtrl");
const ManagerMiddleware = require("../middlewares/ManagerMiddleware");
module.exports = function (app) {
    app.get("/v1/categories", CategoryCtrl.getAll);
    app.get("/v1/categories/:id", CategoryCtrl.getOne);
    app.post("/v1/auth/categories", ManagerMiddleware, CategoryCtrl.create);
    app.put("/v1/auth/categories/:id", ManagerMiddleware, CategoryCtrl.update);
    app.delete(
        "/v1/auth/categories/:id",
        ManagerMiddleware,
        CategoryCtrl.delete
    );
};
