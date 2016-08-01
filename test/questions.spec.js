var expect = require("chai").expect;
const questions = require('../questions');
const constants = require('../constants');

describe("Test question object", () =>{
	it("question should have a validate method", () => {
		expect(questions.questionForMovement()).to.have.property('validate');
		expect(questions.questionForPlacement()).to.have.property('validate');
	});

	it("questionForMovement should a msg", () => {
		expect(questions.questionForMovement().message).to.equal(constants.OTHER_MSG);
		expect(questions.questionForPlacement().message).to.equal(constants.PLACEMENT_MSG);
	});

});
