import { COMPASS } from '../Common';
import { Square } from './Square';

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

	isBakery() {
		return true;
	}

}
