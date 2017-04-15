import { COMPASS, QUARTER } from '../common';
import { Square } from './square';

export class Vane extends Square {

	constructor({id, position, direction, millIds}) {
		super({ id, position, millIds });
		this.direction = direction;
	}

	isOpenTo(direction) {
		switch (direction) {
			case COMPASS.NORTH:
				return this.direction === QUARTER.SOUTHEAST || this.direction === QUARTER.SOUTHWEST;
				break;
			case COMPASS.EAST:
				return this.direction === QUARTER.SOUTHWEST || this.direction === QUARTER.NORTHWEST;
				break;
			case COMPASS.SOUTH:
				return this.direction === QUARTER.NORTHWEST || this.direction === QUARTER.NORTHEAST;
				break;
			case COMPASS.WEST:
				return this.direction === QUARTER.NORTHEAST || this.direction === QUARTER.SOUTHEAST;
				break;
		}
	}

	pointsTo(direction) {
		switch (direction) {
			case COMPASS.NORTH:
				return this.direction === QUARTER.NORTHEAST || this.direction === QUARTER.NORTHWEST;
				break;
			case COMPASS.EAST:
				return this.direction === QUARTER.SOUTHEAST || this.direction === QUARTER.NORTHEAST;
				break;
			case COMPASS.SOUTH:
				return this.direction === QUARTER.SOUTHWEST || this.direction === QUARTER.SOUTHEAST;
				break;
			case COMPASS.WEST:
				return this.direction === QUARTER.NORTHWEST || this.direction === QUARTER.SOUTHWEST;
				break;
		}
	}

	nextDirectionsFrom() {
		return COMPASS.symbols.filter(d => this.pointsTo(d));
	}

}
