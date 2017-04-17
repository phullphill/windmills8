import { COMPASS, QUARTER } from '../Common';
import { Square } from './Square';

export class Market extends Square {

	constructor({id, position, millIds}) {
		super({ id, position, millIds });
	}

	isInOperatingMill(mills) {
		return false;
	}

	isMarket() {
		return true;
	}

}
