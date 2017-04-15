
export class Position {

	constructor(x, y) {
		//console.log(`Creating position at (${x}, ${y})`);
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	isAt(other) {
		return this.x === other.x && this.y === other.y;
	}
}
