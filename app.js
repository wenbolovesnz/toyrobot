var inquirer = require('inquirer');
var greeting = require('./greeting');
var toyBot = require('./toybot');
var constants = require('./constants');
const validationFuns = require('./validationFuncs');
const questions = require('./questions');

var toyBotState;

console.log(greeting());

const askUserQuestion = (callback) => {
    if(toyBotState){
        inquirer.prompt(questions.questionForMovement()).then(callback);
    }else{
        inquirer.prompt(questions.questionForPlacement()).then(callback);
    }
};

function answerHandler(){
    var answer = arguments[0].questionForUser.toUpperCase();
    if(validationFuns.shouldProceed(answer, toyBotState)){
        if(answer === constants.MOVE){
            if(toyBot.isOkToMove(toyBotState)){
                toyBotState = toyBot.move(toyBotState);
            }
        }else if (answer === constants.RIGHT){
            toyBotState = toyBot.turnRight(toyBotState);
        }else if (answer === constants.REPORT){
            toyBot.report(toyBotState);
        }else if(answer === constants.LEFT){
            toyBotState = toyBot.turnLeft(toyBotState);
        }else{
            var placementParams = answer.substring(6).split(',');
            toyBotState = Object.assign({x: placementParams[0], y: placementParams[1], f: placementParams[2]});
        }
    }
    askUserQuestion(answerHandler);
}

askUserQuestion(answerHandler);