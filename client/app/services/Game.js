
import Connection from './Connection';


export default function Game() {

    let gameInfo = {};
    let connection = new Connection();

    connection.onMessage((msg) => {
        handleMessageAction(JSON.parse(msg.data));
    });

    connection.open().then(() => {
        updateBasicGameInfo();
    });


    function handleMessageAction(action) {
        console.log("ACTION: ", action.action);
        switch(action.action) {
            case "gameInfo":
                gameInfo = action.data;
                break;
            default:
                break;
        }
    }

    function updateBasicGameInfo() {
        connection.send({
            action: "gameInfo"
        });
    }

    return {
        forceUpdate: updateBasicGameInfo
    };

}

