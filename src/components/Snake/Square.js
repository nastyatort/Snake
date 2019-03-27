import React from "react";

export default class Square extends React.Component {
    static get TYPE_EMPTY() {
        return 0
    };

    static get TYPE_FOOD() {
        return 2
    };


    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }

    }

    componentWillReceiveProps(props){
        this.setState({type: props.type});
//       this.setState({help: props.z});
//       console.log("square["+this.props.index+"]: update to_state " + this.state.type );
    }

    getType() {
        return this.state.type;
    }

    render() {
        //console.log('square['+ this.props.index+']: render()');
        //console.log('help = ' + this.state.help);
        switch (this.state.type) {
            case Square.TYPE_EMPTY:
                return (
                    <div className='box'></div>
                );
            case Square.TYPE_FOOD:
                return (
                    <div className='box active food'></div>
                );
            default:
                if (this.state.type < 0) {
                    return (
                        <div className='box active'></div>
                    );
                }
            break;
        }
    }
}