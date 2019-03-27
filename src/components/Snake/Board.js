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

        this.cntr = 0;

        this.state = {
            headIdx: 1,
            tailIdx: 0
        };

        const squareSize = 22;
        const boardWidth = this.width * squareSize;
        const boardHeight = this.height * squareSize;
        this.style = {width: boardWidth, height: boardHeight};

        this.putBodySegmentAt(this.state.tailIdx);
        this.putBodySegmentAt(this.state.headIdx);

        for (let i = 2; i < this.width * this.height; i++) {
            this.putEmptyAt(i);
        }

        this.makeSquare(this.width / 2, Square.TYPE_FOOD);
    }


    // Render() should be called at least once for this to work
    putFood() {
        let foodIdx;
        do {
            foodIdx = Math.trunc(Math.random() * this.idxMax);
           // console.log('food idx = ' + foodIdx)
        } while (this.getSquareTypeAt(foodIdx) !== Square.TYPE_EMPTY);

        this.makeSquare(foodIdx, Square.TYPE_FOOD);
    }

    putBodySegmentAt(idx) {
        this.cntr--;
        this.makeSquare(idx, this.cntr);
    }

    putEmptyAt(idx) {
        this.makeSquare(idx, Square.TYPE_EMPTY);
    }

    makeSquare(idx, type) {
        this.boardRef[idx] = React.createRef();
        this.board[idx] = <Square type={type} key={idx} ref={this.boardRef[idx]} />
    }

    getSquareTypeAt(idx) {
        if (idx >= 0 && idx <=  this.idxMax)
            return this.boardRef[idx].current.getType();
    }


    componentWillMount() {
        document.addEventListener('keydown', this.test.bind(this), false)

    }

    moveTail() {
        let curTailValue = this.getSquareTypeAt(this.state.tailIdx);

        var newTailIdx;

        if (curTailValue -1 === this.getSquareTypeAt(this.state.tailIdx -1))
            newTailIdx = this.state.tailIdx -1;
        else if (curTailValue -1 === this.getSquareTypeAt(this.state.tailIdx +1))
            newTailIdx = this.state.tailIdx +1;
        else if (curTailValue -1 === this.getSquareTypeAt(this.state.tailIdx -this.width))
            newTailIdx = this.state.tailIdx -this.width;
        else if (curTailValue -1 === this.getSquareTypeAt(this.state.tailIdx +this.width))
            newTailIdx = this.state.tailIdx +this.width;

        //console.log(" old at "+ this.state.tailIdx + "new tail "+ newTailIdx);

        // Delete current tail
        this.putEmptyAt(this.state.tailIdx);

        this.state.tailIdx = newTailIdx;
    }

    test(e) {

        let newHeadIdx = this.state.headIdx;

        switch (e.keyCode) {
            case 38: // up
                if (this.state.headIdx >= this.width
                    && this.getSquareTypeAt(this.state.headIdx -this.width) >= 0) {
                    newHeadIdx -= this.width;
                    /* console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                break;

            case 40: // down
                if (this.state.headIdx < this.idxMax - this.width
                   && this.getSquareTypeAt(this.state.headIdx +this.width) >= 0) {
                    newHeadIdx += this.width;
                    /*   console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                //console.log('Down '+ this.state.idx );
                break;

            case 37: // left
                if (this.state.headIdx % this.width !== 0
                    && this.getSquareTypeAt(this.state.headIdx -1) >= 0) {
                    newHeadIdx--;
                    /*  console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                }
                break;

            case 39: // right
                if ((this.state.headIdx % this.width) + 1 !== this.width
                    && this.getSquareTypeAt(this.state.headIdx +1) >=0) {
                    newHeadIdx++;
                    /*   console.log("new val "+ this.getSquareTypeAt(this.state.headIdx)) ;*/
                    /*    if(this.getSquareTypeAt(this.state.headIdx) === Square.TYPE_FOOD){
                            this.setState({tailIdx: })
                        }*/
                }
                break;
        }

        if (newHeadIdx !== this.state.headIdx) {
            // Put new head


            if(this.getSquareTypeAt(newHeadIdx) === Square.TYPE_FOOD){
                // We ate some food
                this.putFood();
            } else
                this.moveTail();

            this.putBodySegmentAt( newHeadIdx );

            this.setState({headIdx: newHeadIdx});
        }

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