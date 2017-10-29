

const Game = require('./Game.js');




module.exports = function(maxPlayers=2) {

    let currentGame = new Game();

    // EVENTS
    let onAllPlayersDone = function() {
        console.log("All done!");
    };

    let send = function(id, action) {};
    let broadcast= function(action) {};

    // API
    function handleActionCallFromClient(action, wsId) {
        console.log("ACTION CALL FROM CLIENT:", action);

        switch(action.action) {
            case "gameInfo":


                const response = {
                    action: "gameInfo",
                    data: currentGame.all
                };
                console.log("Send current Game info", response);
                send(wsId, response);

                break;
            default:
                console.log("Unknown action ", action.action);
                break;
        }
    }

    function assignOnAction(cb) {
        send = cb;
    }

    function assignBroadcast(cb) {
        broadcast = cb;
    }

    return {
        receiveAction: handleActionCallFromClient,
        onAction: assignOnAction,
        onBroadcast: assignBroadcast
    };
};