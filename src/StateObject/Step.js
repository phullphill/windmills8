
export class Step {

	constructor(inDirection, position) {
		this.inDirection = inDirection;
		this.position = position;
	}

	isAt(otherPosition) {
		return this.position.isAt(otherPosition);
	}

	toString(withDirection) {
		return this.inDirection === null || !withDirection ?
			`${this.position.toString()}` :
		    `${this.inDirection.toString()} to ${this.position.toString()}`;
	}
}
