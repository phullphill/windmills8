import { QUARTER, MILLSPIN } from './Enums';

export function randomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function determineMillSpin(squareIds, squares) {
	const nw = squares[squareIds[QUARTER.NORTHWEST]];
	const ne = squares[squareIds[QUARTER.NORTHEAST]];
	const se = squares[squareIds[QUARTER.SOUTHEAST]];
	const sw = squares[squareIds[QUARTER.SOUTHWEST]];
	if ([nw, ne, se, sw].some(square => (square.isField() || square.isBakery()))) {
		return MILLSPIN.NOSPIN;
	} else if (nw.direction === QUARTER.NORTHEAST &&
		ne.direction === QUARTER.SOUTHEAST &&
		se.direction === QUARTER.SOUTHWEST &&
		sw.direction === QUARTER.NORTHWEST) {
		return MILLSPIN.CLOCKWISE;
	} else if (nw.direction === QUARTER.SOUTHWEST &&
		ne.direction === QUARTER.NORTHWEST &&
		se.direction === QUARTER.NORTHEAST &&
		sw.direction === QUARTER.SOUTHEAST) {
		return MILLSPIN.COUNTERCLOCKWISE;
	}
	return MILLSPIN.NOSPIN;
}
