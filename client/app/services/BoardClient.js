
import Connection from './Connection';


export default function BoardClient() {

    let connection = new Connection();

    connection.onMessage((msg) => {
        const data= JSON.parse(msg.data);
        console.log("Board get some data! ", data);
    });

    connection.open().then(() => {
        connection.send({
            action: "boardJoin"
        });
    });

    return {
        onMessage: null
    };
}