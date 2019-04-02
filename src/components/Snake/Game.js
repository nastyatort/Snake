import React from "react";
import {default as Board} from "./Board";
import {default as Information} from "./Information";

export default class SnakeGame extends React.Component{
    constructor(props){
        super(props);
        this.newBoard = this.newBoard.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            game: ()=><Board/>,
        }
    }

    newBoard () {
        this.setState({
            game: () => <Board />
        });
    }

    getData(){
        Information.getStatus();
    }

    render () {
        const ActiveBoard = this.state.game;
        return (
            <div>
                <ActiveBoard />
                <button onClick={this.newBoard}>RESET GAME</button>
            </div>
        );
    }
}