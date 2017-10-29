
import Connection from './Connection';

export default function PlayerClient() {

    let connection = new Connection();
    let playerId = null;


    connection.onMessage((msg) => {
        const data= JSON.parse(msg.data);
        console.log("Player Got some data! ", data);
    });

    connection.open().then(() => {
        connection.send({
            action: "playerSlotsFree",
        });
    });

    function playerIsReady() {
        connection.send({
            action: "playerReady",
            id: playerId
        });
    }

    function selectPlayerId(id) {
        playerId = id;
    }

    return {
        selectPlayerNo: selectPlayerId,
        turnReady: playerIsReady
    };

}