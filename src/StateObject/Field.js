import { COMPASS, QUARTER } from '../Common';
import { Square } from './Square';

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

	isField() {
		return true;
	}

}
