
export class Enum {

	constructor(...keys) {
		for (let key of keys) {
			this[key] = Symbol(key);
		}
		this._keys = keys;
		Object.freeze(this);
	}

	get keys() {
		return this._keys;
	}

	get symbols() {
		return this.keys.map( key => this[key] );
	}

	get count() {
		return this.keys.length;
	}

	indexOf(sym) {
		return this.keys.findIndex(key => this[key] === sym);
	}

	keyOf(sym) {
		var index = this.indexOf(sym);
		return index === -1 ? undefined : this.keys[index];
	}

	contains(sym) {
		return this.indexOf(sym) !== -1;
	}

	random() {
		var randomIndex = Math.floor(Math.random() * this.count);
		return this.symbols[randomIndex];
	}

}

export class SequentialEnum extends Enum {

	after(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		var thisIndex = this.indexOf(sym);
		var nextIndex = thisIndex + 1;
		if (nextIndex >= this.count) {
			return null;
		}
		return this[this.keys[nextIndex]];
	}

	before(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		var thisIndex = this.indexOf(sym);
		var prevIndex = thisIndex - 1;
		if (prevIndex < 0) {
			return null;
		}
		return this[this.keys[prevIndex]];
	}

}

export class CircularEnum extends SequentialEnum {

	after(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		var thisIndex = this.indexOf(sym);
		var nextIndex = (thisIndex + 1) % this.count;
		return this[this.keys[nextIndex]];
	}

	before(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		var thisIndex = this.indexOf(sym);
		var prevIndex = thisIndex - 1;
		if (prevIndex === -1) {
			prevIndex = 3;
		}
		return this[this.keys[prevIndex]];
	}

	opposite(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		var thisIndex = this.indexOf(sym);
		var oppositeIndex = (thisIndex + Math.floor(this.count / 2)) % this.count;
		return this[this.keys[oppositeIndex]];
	}

}
