import React from "react";

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: props.status
        }
    }

    componentWillReceiveProps(props){
        this.setState({gameStatus: props.status});
    }

    getStatus() {
        return this.state.status;
    }

    render() {
        switch (this.state.gameStatus) {
            case 0:
                return (
                    <div className='game__start'>Game</div>
                );
            case 1:
                return(
                    <div className="flex">
                    <div className='game__over'>Game over</div>
                    </div>
                )
        }
    }
}