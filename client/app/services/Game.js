
import Connection from './Connection';

export default class Game{

    constructor() {

        this.data = {};

        this.connection = new Connection();
        this.connection.open().then(() => {

        });
    }
}