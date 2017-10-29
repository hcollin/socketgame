
const WebSocket = require('ws');

module.exports = function(serverUrl, serverPort) {

    let connections = {};
    let socketId = 0;

    let wss = null;

    let newConnectionCallback = function(connectionId, ws) {
        console.log("\nNew connection", connectionId);
    };

    let messageCallback = function(connectionId, message) {
        console.log("DEFAULT CALLBACK: Message from Id " + connectionId, ":\n", message);
    };

    function startSocketServer() {
        wss = new WebSocket.Server({ host: serverUrl, port: serverPort}, () => {
            console.log("Game Server started on port 8080!\n");
        });

        wss.on('connection', function connection(ws) {
            const connectionId = "S"+socketId++;
            connections[connectionId] = ws;
            newConnectionCallback(connectionId, ws);
            ws.on('message', function incoming(message) {
                messageCallback(connectionId, message);
            });
        });
    }

    function assignCallbackForNewConnection(cb) {
        newConnectionCallback = cb;
    }

    function assignCallbackForMessage(cb) {
        messageCallback = cb;
    }

    function stopSocketServer() {
        wss.close();
    }

    function getSocketById(id) {
        if(connections[id]) {
            return connections[id];
        }
        return false;
    }

    function sendMessageToId(id, msg) {
        try {
            msg = JSON.stringify(msg);
            connections[id].send(msg, function(err) {
                if(err) {
                    console.log("\nError occured when trying to send a message to id", id, "\n",err);
                    delete connections[id];
                } else {
                    console.log("\tmsg -> " + id);
                }

            });
        } catch(e) {
            console.log("\n\nERROR in connection " + id, "\n", e, "\n", connections);
            delete connections[id];
        }

    }

    function sendMessageToAllConnections(msg) {
        for(key in connections) {
            sendMessageToId(key, msg);
        }
    }

    return {
        onConnection: assignCallbackForNewConnection,
        onMessage: assignCallbackForMessage,
        start: startSocketServer,
        stop: stopSocketServer,
        send: sendMessageToId,
        broadcast: sendMessageToAllConnections,
        getSocket: getSocketById
    };
};

