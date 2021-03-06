const express = require("express");
const logger = require("morgan");
const http = require("http");
const debug = require("debug")("client:server");
const cors = require("cors");
const app = express();

app.use(
    logger(
        // eslint-disable-next-line max-len
        '":remote-addr" ":referrer" ":user-agent" ":method :url HTTP/:http-version" :status :res[content-length] :response-time'
    )
);
app.use(
    cors({
        exposedHeaders: ["Content-Disposition"],
    })
);
app.use(
    express.urlencoded({
        extended: false,
        limit: "30mb",
        parameterLimit: 100000,
    })
);
app.use(express.json({ limit: "50mb" }));

require("./routes")(app);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 3001);

app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, "0.0.0.0");
server.timeout = 900000;
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
    debug("Listening on " + bind);
}
