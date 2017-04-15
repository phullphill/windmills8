
import { COMPASS, QUARTER, MILLSPIN } from '../common/enums';
import { generateId, getVane } from '../store/selectors';

export class Mill {

	constructor(position) {
		this.id = generateId(x, y);
		this.pos = position;

		const x = position.x;
		const y = position.y;

		this.vanes = {
			[QUARTER.NORTHWEST]: generateId(x-1, y-1),
			[QUARTER.NORTHEAST]: generateId(x,   y-1),
			[QUARTER.SOUTHEAST]: generateId(x,   y),
			[QUARTER.SOUTHWEST]: generateId(x-1, y)
		};
		this.updateOperationalStatus();
	}

	updateOperationalStatus() {
		let status = MILLSPIN.NOSPIN;
		let vanes = this.vanes;
		if (vanes[QUARTER.NORTHWEST].direction === QUARTER.NORTHEAST &&
			vanes[QUARTER.NORTHEAST].direction === QUARTER.SOUTHEAST &&
			vanes[QUARTER.SOUTHEAST].direction === QUARTER.SOUTHWEST &&
			vanes[QUARTER.SOUTHWEST].direction === QUARTER.NORTHWEST) {
			status = MILLSPIN.CLOCKWISE;
		} else if (vanes[QUARTER.NORTHWEST].direction === QUARTER.SOUTHWEST &&
			vanes[QUARTER.NORTHEAST].direction === QUARTER.NORTHWEST &&
			vanes[QUARTER.SOUTHEAST].direction === QUARTER.NORTHEAST &&
			vanes[QUARTER.SOUTHWEST].direction === QUARTER.SOUTHEAST) {
			status = MILLSPIN.COUNTERCLOCKWISE;
		}
		this.status = status;
	}

	updateLevel(level) {

		for (let quarter of QUARTER.symbols) {
			var mill = this.getVane(quarter).getMill(quarter);
			if (!mill.isOperating() || mill.getLevel() < level) {
				return false;
			}
		}

		this.level = level+1;
		return true;
	}

	resetLevel() {
		this.level = this.isOperating() ? 1 : 0;
		return true;
	}

	getVane(quarter) {
		return getVane(this.props.game, this.vanes[quarter].position);
	}

	getNextVane(vane) {
		var vaneQuarter = this.getVaneQuarter(vane);
		var nextVaneQuarter = this.isClockWise() ? QUARTER.after(vaneQuarter) : QUARTER.before(vaneQuarter);
		return this.getVane(nextVaneQuarter);
	}

	getPriorVane(vane) {
		var vaneQuarter = this.getVaneQuarter(vane);
		var priorVaneQuarter = this.isClockWise() ? QUARTER.before(vaneQuarter) : QUARTER.after(vaneQuarter);
		return this.getVane(priorVaneQuarter);
	}

	getVaneQuarter(vane) {
		var vaneQuarter;
		for (let quarter of QUARTER.symbols) {
			if (this.vaneIsInQuarter(vane, quarter)) {
				vaneQuarter = quarter;
			}
		}
		return vaneQuarter;
	}

	isClockWise() {
		return this.status === MILLSPIN.CLOCKWISE;
	}

	isCounterClockWise() {
		return this.status === MILLSPIN.COUNTERCLOCKWISE;
	}

	isOperating() {
		return this.status !== MILLSPIN.NOSPIN;
	}

	vaneIsInQuarter(vane, quarter) {
		let millVane = this.getVane(quarter);
		return millVane.position.isAt(vane.position);
	}

}
