import { MILLSPIN } from '../Common';

export class Mill {

	constructor({id, position, squareIds, spin}) {
		this.id = id;
		this.position = position;
		this.vaneIds = squareIds;
		this.spin = spin;
	}

	isClockWise() {
		return this.spin === MILLSPIN.CLOCKWISE;
	}

	isCounterClockWise() {
		return this.spin === MILLSPIN.COUNTERCLOCKWISE;
	}

	isSpinning() {
		return this.spin !== MILLSPIN.NOSPIN;
	}

}
