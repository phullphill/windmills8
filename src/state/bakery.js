import { COMPASS } from '../common';
import { Square } from './square';

export class Bakery extends Square {

	constructor({id, position, millIds, direction}) {
		super({ id, position, millIds });
		this.doorDirection = direction;
	}

	nextDirectionsFrom() {
		return [this.doorDirection];
	}

	isInOperatingMill(mills) {
		return false;
	}

}
