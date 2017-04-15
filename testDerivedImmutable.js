import { OrderedMap, Record, Range } from 'immutable';

export const VaneRecord = Record({
	id: '',
	x: 0,
	y: 0,
	direction: 'NW',
	mills: []
});

export class Vane extends VaneRecord {

	constructor(id, x, y, direction) {
		super({id, x, y, direction});
	}

}

export const GameRecord = Record({
	id: 0,
	width: 0,
	height: 0,
	vanes: OrderedMap(),
	mills: [],
	player: {}
});

export class Game extends GameRecord {

	constructor(id, width, height) {
		const vanes = new OrderedMap([
			['0.0', new Vane({id: '0.0', x:0, y: 0, direction: 'NW'})],
			['0.1', new Vane({id: '0.1', x:0, y: 1, direction: 'SW'})]
		]);
		super({id, width, height, vanes});
	}

	//set width(w) { return this.set('width'. w); }

	get area() {
		return this.width * this.height;
	}

}

let game1 = new Game(12, 7, 3);
console.log(`game1 wxh = ${game1.width}x${game1.height}. area=${game1.area}`);
game1 = game1.set('height', 4);
console.log(`after set height=4 game1 wxh = ${game1.width}x${game1.height}. area=${game1.area}`);
game1 = game1.width = 5;
console.log(`after set width=5 game1 wxh = ${game1.width}x${game1.height}. area=${game1.area}`);
