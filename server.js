const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

// Log requests using morgan
app.use(morgan("combined"));
app.use(
    morgan("dev", {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
    })
);

// Parse application/json
app.use(
    bodyParser.json({
        limit: "5mb",
    })
);

// Parse application/vnd.api+json as json
app.use(
    bodyParser.json({
        type: "application/vnd.api+json",
    })
);

// Parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: "5mb",
        extended: true,
    })
);

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

// Support CORS from API
app.use(cors());

// Auth Middleware - This will check if the token is valid
app.all("/api/v1/auth/*", [require("./app/middlewares/ValidateRequest")]);

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Function to send notifications
function sendNotification(event, data) {
    console.log(`Sending notification: Event - ${event}, Data -`, data);
    io.emit(event, data);
}

// Export sendNotification and incrementOrderCount for use in other modules
module.exports.sendNotification = sendNotification;

// Routes ==================================================
require("./app/route")(app); // Configure our routes

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`API V2.1 started and listening on port ${PORT}`);
});

// Expose app, io, and orderCount for use in other modules
module.exports = { app, io };
