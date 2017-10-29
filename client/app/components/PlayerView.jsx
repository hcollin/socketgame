import React from 'react';

import PlayerClient from '../services/PlayerClient';

export default class PlayerView extends React.Component {

    constructor(props) {
        super(props);

        this.client = new PlayerClient();
    }

    render() {
        return (
            <div id="playerView">
                PLAYER VIEW for player {this.props.no}!
            </div>
        )
    }
}