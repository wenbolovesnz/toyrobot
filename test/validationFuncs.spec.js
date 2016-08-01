var expect = require("chai").expect;
const validationFuncs = require('../validationFuncs');
const constants = require('../constants');

describe("Test shouldProceed", () =>{
	it("should not proceed with any commend other (Place) if toybot is not set", () => {
		const toyBot;
		expect(validationFuncs.shouldProceed(constants.MOVE, toyBot)).to.equal(false);
		expect(validationFuncs.shouldProceed(constants.REPORT, toyBot)).to.equal(false);
		expect(validationFuncs.shouldProceed(constants.RIGHT, toyBot)).to.equal(false);
		expect(validationFuncs.shouldProceed(constants.LEFT, toyBot)).to.equal(false);
	});

	it("should return true with (Place) if toyBotSate is not set", () => {
		const toyBot;
		expect(validationFuncs.shouldProceed('place 1,1,north', toyBot)).to.equal(true);
	});

	it("once toyBot is set, should not return false to all commend", () => {
		const toyBot = {};
		expect(validationFuncs.shouldProceed('place 1,1,north', toyBot)).to.not.equal(false);
		expect(validationFuncs.shouldProceed(constants.MOVE, toyBot)).to.not.equal(false);
		expect(validationFuncs.shouldProceed(constants.REPORT, toyBot)).to.not.equal(false);
		expect(validationFuncs.shouldProceed(constants.RIGHT, toyBot)).to.not.equal(false);
		expect(validationFuncs.shouldProceed(constants.LEFT, toyBot)).to.not.equal(false);
	});
});

describe("Test validate", () =>{
	it("should return a message if the command commend is not valid", () => {
		const msg = 'test';
		const validator = validationFuncs.validate(msg);
		expect(validator.validate('somehting wrong')).to.equal(msg);
	});

	it("should return true if the command commend is valid", () => {
		const msg = 'test';
		const validator = validationFuncs.validate(msg);
		expect(validator.validate(constants.MOVE)).to.equal(true);
		expect(validator.validate(constants.REPORT)).to.equal(true);
		expect(validator.validate(constants.RIGHT)).to.equal(true);
		expect(validator.validate(constants.LEFT)).to.equal(true);
		expect(validator.validate('place 1,1,north')).to.equal(true);
	});

	it("validate placement func should return msg, if the input are not match regex pattern", () => {
		const msg = 'test';
		const validator = validationFuncs.validate(msg);
		expect(validator.validate('place, 1,1,north')).to.equal(msg);
		expect(validator.validate('place, 1,1,north ')).to.equal(msg);
		expect(validator.validate('place 1,north')).to.equal(msg);
		expect(validator.validate('place 1,1,dfdfd')).to.equal(msg);
		expect(validator.validate('place')).to.equal(msg);
		expect(validator.validate('place ,,1, north')).to.equal(msg);
	});

});
