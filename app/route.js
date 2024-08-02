module.exports = function (app) {
    require("./routes/CoffeeShop")(app);
    require("./routes/User")(app);
    require("./routes/Customer")(app);
    require("./routes/Table")(app);
    require("./routes/Category")(app);
    require("./routes/Dish")(app);
    require("./routes/Combo")(app);
    require("./routes/ComboDetail")(app);
    require("./routes/Order")(app);
    require("./routes/OrderDetail")(app);
    require("./routes/Payment")(app);
};
