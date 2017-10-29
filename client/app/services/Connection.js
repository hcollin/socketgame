

export default function Connection() {

    let socket = null;
    let listeners = [];
    let dataQueue = [];
    let isOpen = false;

    let reciever = (msg) => {
        console.log("Undefined reciever", msg);
    };

    function openNewConnection(url=false) {
        return new Promise((resolve, reject) => {
            url = url ? url : "ws://localhost:8080";
            socket = new WebSocket(url);

            socket.onopen = () => {
                isOpen = true;
                resolve();
            };

            socket.onerror = (err) => {
               if(isOpen) {
                   closeConnection();
               } else {
                   reject();
               }
            };

            socket.onmessage = reciever;

            window.onbeforeunload = function(event) {
                socket.close();
            };
        });
    }


    function closeConnection() {
        isOpen = false;
        if(socket !== null) {
            socket.close();

        }
    }

    function sendData(data) {

        dataQueue.push(JSON.stringify(data));
        _sendQueue();
    }

    function _sendQueue() {
        if(isOpen) {
            while(dataQueue.length > 0) {
                const data = dataQueue.pop();
                socket.send(data);
            }
        }
    }

    function defineReciever(cb) {
        reciever = cb;
    }

    return {
        open: openNewConnection,
        close: closeConnection,
        send: sendData,
        onMessage: defineReciever
    };
}