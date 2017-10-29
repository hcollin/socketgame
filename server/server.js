
const SocketServer = require('./SocketServer.js');
const ActionsHandler = require('./ActionsHandler.js');

let server = new SocketServer("localhost", 8080);

let actionHandler = new ActionsHandler();

// Message Callback handler
const messageHandler = function (id, msg) {
    actionHandler.receiveAction(JSON.parse(msg), id);
};

// New connection handler
const newConnectionHandler = function(id, ws) {
    console.log("New game connection from client", id);
};

server.onConnection(newConnectionHandler);
server.onMessage(messageHandler);
server.start();

// Game wants to send a message to a singular client
const sendMessageToClient = function(id, action) {
    server.send(id, action);
};

// game wants to broadcast to all clients
const broadCastToAllClients = function(action) {
    server.broadcast(action);
};


actionHandler.onBroadcast(broadCastToAllClients);
actionHandler.onAction(sendMessageToClient);

// setInterval(function() {
//     server.broadcast({action: "ping", msg: "Server is listening"});
// }, 5000);