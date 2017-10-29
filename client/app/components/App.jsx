import React from 'react';
// import DB from './DB';

import BoardView from './BoardView';
import PlayerView from './PlayerView';

import Game from '../services/Game';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: null,
            playerNo: null
        };

        this.selectBoardMode = this.selectBoardMode.bind(this);
        this.selectPlayerMode = this.selectPlayerMode.bind(this);
        this.selectPlayerNo = this.selectPlayerNo.bind(this);

    }

    componentDidMount() {
        this.game = new Game();





    }

    _switchModeTo(targetMode) {
        this.setState({
            viewMode: targetMode,
            playerNo: null
        });
    }

    selectPlayerMode() {
        this._switchModeTo("player");
    }

    selectBoardMode() {
        this._switchModeTo("board");
    }

    selectPlayerNo(event) {
        this.setState({
            playerNo: event.target.value,
            viewMode: "player"
        });
    }

    render() {

        if(this.state.viewMode === "player" && this.state.playerNo !== null) {
            return (
                <PlayerView no={this.state.playerNo} />
            )
        }

        if(this.state.viewMode === "player" && this.state.playerNo === null) {
            return (
                <div className="SelectPlayer">
                  <h1>Select Player Number</h1>
                  <button onClick={this.selectPlayerNo} value="1"> 1 </button>
                  <button onClick={this.selectPlayerNo} value="2"> 2 </button>
                  <button onClick={this.selectPlayerNo} value="3"> 3 </button>
                  <button onClick={this.selectPlayerNo} value="4"> 4 </button>
                </div>
            )
        }

        if(this.state.viewMode === "board") {
            return (
                <BoardView />
            )
        }

        return (
            <div className="ChooseView">
              <h1>Choose View mode!</h1>
              <button onClick={this.selectPlayerMode} > PLAYER MODE </button>
              <button onClick={this.selectBoardMode} > BOARD MODE </button>
            </div>
        )
    }
}
