import React from "react";
import {default as Square} from "./Square";


export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.board = [];
        this.boardRef = [];
        this.width = 10;
        this.height = 10;
        this.idxMax = this.width * this.height;

        this.state = {
            headIdx: 0,
            tailIdx: 0
        };

        const squareSize = 22;
        const boardWidth = this.width * squareSize;
        const boardHeight = this.height * squareSize;
        this.style = {width: boardWidth, height: boardHeight}

        this.putHeadAt(0);

        for (let i = 1; i < this.width * this.height; i++) {
            this.putEmptyAt(i);
        }

        this.makeSquare(this.width / 2, Square.TYPE_FOOD);
    }


    // Render() should be called at least once for this to work
    putFood() {
        do {
            var foodIdx = Math.trunc(Math.random() * this.idxMax);
            console.log('food idx = ' + foodIdx)
        } while (this.getSquareTypeAt(foodIdx) != Square.TYPE_EMPTY);

        this.makeSquare(foodIdx, Square.TYPE_FOOD);
    }

    putHeadAt(idx) {
        this.makeSquare(idx, Square.TYPE_HEAD);
    }

    putTailAt(idx) {
        this.makeSquare(idx, Square.TYPE_HEAD);
    }


    putEmptyAt(idx) {
        this.makeSquare(idx, Square.TYPE_EMPTY);
    }

    makeSquare(idx, type) {
        this.boardRef[idx] = React.createRef();
        this.board[idx] = <Square type={type} key={idx} ref={this.boardRef[idx]} />
    }

    getSquareTypeAt(idx) {
        return this.boardRef[idx].current.getType();
    }


    componentWillMount() {
        document.addEventListener('keydown', this.test.bind(this), false)

    }

    test(e) {

        this.putEmptyAt(this.state.headIdx);

        switch (e.keyCode) {
            case 38: // up
                if(this.state.headIdx >= this.width) {
                    this.state.headIdx -= this.width;
                    /* console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                break;

            case 40: // down
                if(this.state.headIdx < this.height * this.width - this.width) {
                    this.state.headIdx += this.width;
                    /*   console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                //console.log('Down '+ this.state.idx );
                break;

            case 37: // left
                if(this.state.headIdx % this.width !== 0) {
                    this.state.headIdx--;
                    /*  console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                break;

            case 39: // right
                if((this.state.headIdx % this.width) + 1 !== this.width) {
                    this.state.headIdx++;
                    /*   console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                    /*    if(this.getSquareTypeAt(this.state.headIdx) === Square.TYPE_FOOD){
                            this.setState({tailIdx: })
                        }*/
                }
                break;

        }

        if(this.getSquareTypeAt(this.state.headIdx) === Square.TYPE_FOOD){
            this.putFood();

        }


        this.putHeadAt( this.state.headIdx );

        this.setState({headIdx: this.state.headIdx});
    }

    render(){
        return(
            <div>
                <div className="square__wrapper" style={this.style}>
                    {this.board}
                </div>
            </div>
        )
    }
}