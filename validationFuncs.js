const R = require('ramda');
const constants = require('./constants');
const MOVE = constants.MOVE;
const LEFT = constants.LEFT;
const RIGHT = constants.RIGHT;
const REPORT = constants.REPORT;


const validatePlacement = (string) =>{
	var regex = /^PLACE\s[0-4],[0-4],(WEST|EAST|NORTH|SOUTH)$/i;
	return regex.test(string);
};

const validateMove = (string) =>{
	return MOVE === string.toUpperCase();
};

const validateLeft = (string) =>{
	return LEFT === string.toUpperCase();
};

const validateRight = (string) =>{
	return RIGHT === string.toUpperCase();
};
const validateReport = (string) =>{
	return REPORT === string.toUpperCase();
};

const commendValidators = [validateLeft, validateMove, validateRight, validatePlacement, validateReport];

const shouldProceed = (actionName, toyBotState)=>{
	if(toyBotState){
		return  R.find((validator)=> validator(actionName))(commendValidators);
	}else{
		return validatePlacement(actionName)
	}
};

const validate = (message) => ({
	validate: (value) => {
		if(value === ''){
			return message;
		}else{
			var isValid = R.find((validator)=> validator(value))(commendValidators);
			return isValid ? true : message;
		}
	}
});

module.exports = {
	shouldProceed: shouldProceed,
	commendValidators : commendValidators,
	validate: validate
};