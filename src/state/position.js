
export class Position {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	isAt(other) {
		return this.x === other.x && this.y === other.y;
	}

	toString() {
		return `(${this.x},${this.y})`;
	}
}
