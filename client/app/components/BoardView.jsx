import React from 'react';

import BoardClient from '../services/BoardClient';

export default class BoardView extends React.Component {

    constructor(props) {
        super(props);

        this.client = new BoardClient();



    }

    render() {
        return (
            <div id="boardView">
                BOARD VIEW!
            </div>
        )
    }
}