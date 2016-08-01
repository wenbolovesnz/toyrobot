var expect = require("chai").expect;
const toyBot = require('../toybot');
const constants = require('../constants');

describe("Toybot api tests", () =>{
	it("Move with face north should increase x by 1", () => {
		const state = {x: 1, y: 1, f: constants.NORTH};
		const newState = toyBot.move(state);
		expect(newState.x).to.equal(2);
	});

	it("Move with face south should reduce x by 1", () => {
		const state = {x: 1, y: 1, f: constants.SOUTH};
		const newState = toyBot.move(state);
		expect(newState.x).to.equal(0);
	});

	it("Move with face east should increase y by 1", () => {
		const state = {x: 1, y: 1, f: constants.EAST};
		const newState = toyBot.move(state);
		expect(newState.y).to.equal(2);
	});

	it("Move with face west should reduce y by 1", () => {
		const state = {x: 1, y: 1, f: constants.WEST};
		const newState = toyBot.move(state);
		expect(newState.y).to.equal(0);
	});

	it("Face east turn right should set fact south", () => {
		const state = {x: 1, y: 1, f: constants.EAST};
		const newState = toyBot.turnRight(state);
		expect(newState.f).to.equal(constants.SOUTH);
	});

	it("Face east turn left should set fact north", () => {
		const state = {x: 1, y: 1, f: constants.EAST};
		const newState = toyBot.turnLeft(state);
		expect(newState.f).to.equal(constants.NORTH);
	});

	it("Face South turn left should set fact east", () => {
		const state = {x: 1, y: 1, f: constants.SOUTH};
		const newState = toyBot.turnLeft(state);
		expect(newState.f).to.equal(constants.EAST);
	});

	it("Toybot should not move if x is 0 and f is south ", () => {
		const state = {x: 0, y: 0, f: constants.SOUTH};
		const isOk = toyBot.isOkToMove(state);
		expect(isOk).to.equal(false);
	});

	it("Toybot should not move if x is 4 and f is north", () => {
		const state = {x: 4, y: 4, f: constants.NORTH};
		const isOk = toyBot.isOkToMove(state);
		expect(isOk).to.equal(false);
	});

	it("Toybot should not move if y is 4 and f is east", () => {
		const state = {x: 0, y: 4, f: constants.EAST};
		const isOk = toyBot.isOkToMove(state);
		expect(isOk).to.equal(false);
	});
});
