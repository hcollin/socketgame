import React from 'react';

export default class PlayerView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="playerView">
                PLAYER VIEW for player {this.props.no}!
            </div>
        )
    }
}