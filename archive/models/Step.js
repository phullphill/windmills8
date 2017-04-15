
export class Step {

	constructor(from, position, to) {
		this.fromDirection = from;
		this.pos = position;
		this.toDirection = to;
	}

	get position() {
		return this.pos;
	}

	get from() {
		return this.fromDirection;
	}

	get to() {
		return this.toDirection;
	}

	set to(direction) {
		this.toDirection = direction;
	}

	isAt(otherPosition) {
		return this.pos.isAt(otherPosition);
	}

}
