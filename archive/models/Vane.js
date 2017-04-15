import { COMPASS, QUARTER } from '../common/enums';
import { Position } from './Position';
import { getMill, generateId } from '../store/selectors';

export class Vane {

	constructor(position) {
		this.id = generateId(position);
		this.pos = position;

		const x = position.x;
		const y = position.y;

		this.mills = {
			[QUARTER.NORTHWEST]: generateId(x,   y),
			[QUARTER.NORTHEAST]: generateId(x+1, y),
			[QUARTER.SOUTHEAST]: generateId(x+1, y+1),
			[QUARTER.SOUTHWEST]: generateId(x,   y+1)
		};
	}

	get position() {
		return this.pos;
	}

	get direction() {
		return this.dir;
	}

	set direction(direction) {
		this.dir = direction;
	}

	rotate(nTurns) {
		for (let i=0; i<nTurns; i++) {
			this.direction = QUARTER.after(this.direction);
		}
		this.updateMills();
		return this;
	}

	isInOperatingMill() {
		for (let quarter of QUARTER.symbols) {
			var mill = this.getMill(quarter);
			if (mill && mill.isOperating()) {
				return true;
			}
		}
		return false;
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

	isSameAs(other) {
		return this.position.isAt(other.position);
	}

	isOneOf(otherVanes) {
		return otherVanes.some(v => this.isSameAs(v));
	}

	getMill(quarter) {
		const millId = this.mills[quarter];
		return getMill(millId);
	}

	updateMills() {
		for (let quarter of QUARTER.symbols) {
			this.getMill(quarter).updateOperationalStatus();
		}
	}

}
