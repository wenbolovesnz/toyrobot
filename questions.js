const validationFuns = require('./validationFuncs');
var constants = require('./constants');
const placementMessage = constants.PLACEMENT_MSG;
const otherActionMessage = constants.OTHER_MSG;

const question = (message) =>{
	var property = {
		name: 'questionForUser',
		type: 'input',
		message: message
	};
	return Object.assign({}, property, validationFuns.validate(message))
};

const questionForPlacement = () => question(placementMessage);
const questionForMovement = () => question(otherActionMessage);

module.exports = {
	questionForPlacement: questionForPlacement,
	questionForMovement: questionForMovement
};
