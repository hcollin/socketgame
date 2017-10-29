



module.exports = function() {

    let gameData = {
        players: [],
        maxPlayers: 2,
        turn: 0
    };

    return {
        set: null,
        get: null,
        all: gameData
    };
};