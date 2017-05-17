"use strict";

const FirebaseServer = require("firebase-server");
const portscanner = require("portscanner");

let server = null;
let portString = "";

function startServer(port) {
    server = new FirebaseServer(port);
    portString = port.toString();
    process.on("exit", closeServer);
}

function closeServer() {
    if (server) {
        server.close(() => {
            server = null;
        });
    }
}

module.exports = function(options) {
    if (typeof options === "object" && "port" in options) {
        startServer(options.port);
    } else {
        portscanner.findAPortNotInUse(49152, 65535).then(port => {
            startServer(port);
        });
    }
    return (req, res, next) => {
        switch (req.path) {
            case "/port":
                if (server) {
                    res.send(portString);
                    return;
                }
                break;
            case "/get-value":
                if (server) {
                    server.getValue().then(data => {
                        res.send(data);
                        return;
                    });
                }
                break;
            case "/export-data":
                if (server) {
                    server.exportData().then(data => {
                        res.send(data);
                        return;
                    });
                }
                break;
            default:
                next();
                return;
        }
        res.sendStatus(204);
    };
};
