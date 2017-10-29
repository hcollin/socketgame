
import Connection from './Connection';

export default class Game{

    constructor() {

        this.data = {};

        this.connection = new Connection();

        this.connection.onMessage((msg) => {
           console.log("Incoming transmission...\n", msg.data);
        });

        this.connection.open().then(() => {

        });
    }


}