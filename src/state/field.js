import { COMPASS, QUARTER } from '../common';
import { Square } from './square';

export class Field extends Square {

	constructor({id, position, content, millIds}) {
		super({ id, position, millIds });
		this.content = content;
	}

	nextDirectionsFrom() {
		return COMPASS.symbols;
	}

	isInOperatingMill(mills) {
		return false;
	}

}
