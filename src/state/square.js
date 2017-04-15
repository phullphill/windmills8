import { QUARTER } from '../common';

export class Square {

	constructor({id, position, millIds}) {
		this.id = id;
		this.position = position;
		this.millIds = millIds;
	}

	isAt(otherPosition) {
		return this.position.isAt(otherPosition);
	}

	isSameAs(other) {
		return this.position.isAt(other.position);
	}

	isOneOf(otherSquares) {
		return otherSquares.some(v => this.isSameAs(v));
	}

	isInOperatingMill(mills) {
		const millIds = QUARTER.symbols.map(q => this.millIds[q]);
		return millIds.some(id => mills[id].isSpinning());
	}

}
