import { Position } from '../models/Position';
import { COMPASS } from '../common/enums';

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getVane(state, vaneId) {
	return state.vanes[vaneId];
}

export function getMill(state, millId) {
	return state.mills[millId];
}

export function randomBoardPosition(state) {
	return new Position(getRandomIntInclusive(0, state.width-1), getRandomIntInclusive(0, state.height-1));
}

export function positionInDirection(state, fromPosition, toDirection) {
	const increment = (toDirection === COMPASS.NORTH || toDirection === COMPASS.WEST) ? -1 : 1;
	let x = fromPosition.x;
	let y = fromPosition.y;
	if (toDirection === COMPASS.NORTH || toDirection === COMPASS.SOUTH) {
		y = (y + increment + state.height) % state.height;
	} else {
		x = (x + increment + state.width) % state.width;
	}
	return new Position(x, y);
}

export function nextVanesFrom(state, fromPosition) {
	let nextVanes = [];
	const startingVane = getVane(fromPosition);
	for (let direction of COMPASS.symbols) {
		if (!startingVane.isOpenTo(direction)) {
			nextVanes.push(getVane(state, positionInDirection(state, fromPosition, direction)));
		}
	}
	return nextVanes;
}

function getPlayerPosition(state) {
	return state.path.lastStep.position;
}

function getPlayerNextVanes(state) {
	return nextVanesFrom(getPlayerPosition(state));
}

function playerIsAt(state, otherPosition) {
	return getPlayerPosition(state).isAt(otherPosition);
}

function getPathLength(state) {
	return state.steps.length;
}

function getLastStep(state) {
	const pathLength = getPathLength(state);
	return pathLength === 0 ? null : state.steps[pathLength - 1];
}

function currentPosition() {
	return getLastStep().position;
}

function allStepsThrough(state, position) {
	return state.steps.filter(s => s.isAt(position));
}
