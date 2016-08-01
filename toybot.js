var R = require('ramda');
var constants = require('./constants');
const NORTH = constants.NORTH;
const SOUTH = constants.SOUTH;
const WEST = constants.WEST;
const EAST = constants.EAST;
const RIGHT = constants.RIGHT;
const LEFT =constants.LEFT;
const rightActionToNorth = {f:WEST, newFace: NORTH};
const rightActionToSouth = {f:EAST, newFace: SOUTH};
const rightActionToWest = {f:SOUTH, newFace: WEST};
const rightActionToEast = {f:NORTH, newFace: EAST};
const leftActionToNorth = {f:EAST, newFace: NORTH};
const leftActionToSouth = {f:WEST, newFace: SOUTH};
const leftActionToWest = {f:NORTH, newFace: WEST};
const leftActionToEast = {f:SOUTH, newFace: EAST};

const moveNorth = {
     f: NORTH,
     move:(state) =>{
            state.x++;
            return Object.assign({}, state);
        }
};

const moveWest = {
    f: WEST,
    move:(state) =>{
        state.y--;
        return Object.assign({}, state);
    }
};

const moveSouth = {
    f: SOUTH,
    move:(state) =>{
        state.x--;
        return Object.assign({}, state);
    }
};

const moveEast = {
    f: EAST,
    move:(state) =>{
        state.y++;
        return Object.assign({}, state);
    }
};

const moveHanlders = [moveEast, moveNorth, moveWest, moveSouth];

const validations = [{f: NORTH, value: 4, property:'x'},
                        {f:EAST, value: 4, property:'y'},
                            {f: SOUTH, value: 0, property:'x'},
                                {f: WEST, value: 0, property:'y'}];

const rightActionHandlers = [rightActionToNorth, rightActionToEast, rightActionToSouth, rightActionToWest];
const leftActionHandlers = [leftActionToNorth, leftActionToEast, leftActionToSouth, leftActionToWest];


const isOkToMove = (currentState) =>{
    var matchValidation = R.find(R.propEq('f', currentState.f))(validations);
    return currentState[matchValidation.property] !== matchValidation.value;
};

const move = (currentState)=>{
    var handler = R.find(R.propEq('f', currentState.f))(moveHanlders);
    return handler.move(currentState);
};

const turn = (direction)=>{
    return (state)=>{
        var newState = {};
        if(direction === RIGHT){
            newState.f = R.find(R.propEq('f', state.f))(rightActionHandlers).newFace;
        }else{
            newState.f = R.find(R.propEq('f', state.f))(leftActionHandlers).newFace;
        }
        return Object.assign({}, state, newState);

    };
};

const turnLeft = turn(LEFT);
const turnRight = turn(RIGHT);

const report = (state) => {
    console.log(state.x, state.y, state.f);
};

module.exports = {
    report: report,
    move: move,
    turnLeft: turnLeft,
    turnRight: turnRight,
    isOkToMove: isOkToMove
};




