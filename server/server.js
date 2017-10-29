
const SocketServer = require('./SocketServer.js');

let server = new SocketServer("localhost", 8080);
server.start();
