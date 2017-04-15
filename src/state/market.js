import { COMPASS, QUARTER } from '../common';
import { Square } from './square';

export class Market extends Square {

	constructor({id, position, millIds}) {
		super({ id, position, millIds });
	}

	isInOperatingMill(mills) {
		return false;
	}

}
