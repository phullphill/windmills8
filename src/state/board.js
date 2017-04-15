import {
	COMPASS,
	QUARTER,
	MILLSPIN,
	FIELD_CONTENT,
	randomIntInclusive,
	determineMillSpin
} from '../common';
import { Market } from './market';
import { Bakery } from './bakery';
import { Field } from './field';
import { Vane } from './vane';
import { Mill } from './mill';
import { Position } from './position';

export class Board {

	constructor({id, width, height, portWidth, portHeight, boardProbabilities}) {
		this.id = id;
		this.width = width;
		this.height = height;
		this.portWidth = portWidth+2;
		this.portHeight = portHeight+2;
		this.probabilities = boardProbabilities;
		this.marketPosition = this.randomPosition();
		this.squares = this.createSquares(this.marketPosition);
		this.mills = this.createMills();
	}

	randomPosition() {
		return new Position(randomIntInclusive(0, this.width-1), randomIntInclusive(0, this.height-1));
	}

	randomSquare({id, position, millIds}) {
		const typeSeed = randomIntInclusive(1, 100);
		if (typeSeed < this.probabilities.bakery) {
			const direction = COMPASS.random();
			return new Bakery({id, position, millIds, direction});
		} else if (typeSeed < this.probabilities.field) {
			const content = FIELD_CONTENT.random();
			return new Field({id, position, content, millIds})
		} else {
			const direction = QUARTER.random();
			return new Vane({id, position, direction, millIds});
		}
	}

	createSquares(marketPosition) {
		const squares = {};
		for (let y = 0; y<this.height; y++) {
			for (let x = 0; x<this.width; x++) {
				const position = new Position(x, y);
				const id = this.generateId(position);
				const millIds = this.squareMillIds(position);
				if (position.isAt(marketPosition)) {
					squares[id] = new Market({id, position, millIds})
				} else {
					squares[id] = this.randomSquare({id, position, millIds});
				}
			}
		}
		return squares;
	}

	createMills() {
		const mills = {};
		for (let y = 0; y<this.height; y++) {
			for (let x = 0; x<this.width; x++) {
				const position = new Position(x, y);
				const id = this.generateId(position);
				const squareIds = this.millSquareIds(position);
				const spin = determineMillSpin(squareIds, this.squares);
				mills[id] = new Mill({id, position, squareIds, spin});
			}
		}
		return mills;
	}

	generateId(position) {
		return `${position.x}.${position.y}`;
	}

	wrapCoordinates(x, y) {
		const width = this.width;
		const height = this.height;
		return [
			(x + width) % width,
			(y + height) % height
		];
	}

	positionFrom(position, toDirection) {
		const increments = {
			[COMPASS.NORTH]: { x: 0, y: -1 },
			[COMPASS.EAST]: { x: 1, y: 0 },
			[COMPASS.SOUTH]: { x: 0, y: 1 },
			[COMPASS.WEST]: { x: -1, y: 0 },
		};
		const inc = increments[toDirection];
		const newCoords = this.wrapCoordinates(position.x + inc.x, position.y + inc.y);
		return new Position(...newCoords);
	}

	squareMillIds(squarePosition) {
		const x = squarePosition.x;
		const y = squarePosition.y;
		return {
			[QUARTER.NORTHWEST]: this.generateId(new Position(...this.wrapCoordinates(x,   y))),
			[QUARTER.NORTHEAST]: this.generateId(new Position(...this.wrapCoordinates(x+1, y))),
			[QUARTER.SOUTHEAST]: this.generateId(new Position(...this.wrapCoordinates(x+1, y+1))),
			[QUARTER.SOUTHWEST]: this.generateId(new Position(...this.wrapCoordinates(x,   y+1)))
		};
	}

	millSquareIds(millPosition) {
		const x = millPosition.x;
		const y = millPosition.y;
		return {
			[QUARTER.NORTHWEST]: this.generateId(new Position(...this.wrapCoordinates(x-1, y-1))),
			[QUARTER.NORTHEAST]: this.generateId(new Position(...this.wrapCoordinates(x,   y-1))),
			[QUARTER.SOUTHEAST]: this.generateId(new Position(...this.wrapCoordinates(x,   y))),
			[QUARTER.SOUTHWEST]: this.generateId(new Position(...this.wrapCoordinates(x-1, y)))
		};
	}

	squareById(squareId) {
		return this.squares[squareId];
	}

	squareAt(position) {
		return this.squareById(this.generateId(position));
	}

	millById(millId) {
		return this.mills[millId];
	}

	millAt(position) {
		return this.millById(this.generateId(position));
	}

	nextPositionFrom(position, toDirection) {
		return this.positionFrom(position, toDirection)
	}

	allFields() {
		return Object.values(this.squares).filter(s => s.constructor.name === 'Field');
	}

	playerNextSquares(player) {
		const playerPosition = player.position;
		const square = this.squareAt(playerPosition);
		const nextDirections = square.nextDirectionsFrom();
		return nextDirections.map(d => {
			const nextSquare = this.squareAt(this.nextPositionFrom(playerPosition, d));
			if (nextSquare.constructor.name !== 'Bakery' || nextSquare.doorDirection === COMPASS.opposite(d)) {
				return nextSquare;
			}
		});
	}

	directionBetween(fromPosition, toPosition) {
		const dirs = COMPASS.symbols.filter(d =>
			this.nextPositionFrom(fromPosition, d, this.width, this.height).isAt(toPosition)
		);
		return dirs.length === 1 ? dirs[0] : null;
	}

	getPortRowOrdinates(centrePosition) {
		const rowOrdinates = [];
		const halfHeight = Math.floor(this.portHeight / 2);
		for (let y=0; y<this.portHeight; y++) {
			rowOrdinates.push((centrePosition.y - halfHeight + y + this.height) % this.height);
		}
		return rowOrdinates;
	}

	getPortColOrdinates(centrePosition) {
		const colOrdinates = [];
		const halfWidth = Math.floor(this.portWidth / 2);
		for (let x=0; x<this.portWidth; x++) {
			colOrdinates.push((centrePosition.x - halfWidth + x + this.width) % this.width);
		}
		return colOrdinates;
	}

	spinningMillCount() {
		return this.spinningMills().length;
	}

	spinningMills() {
		let spinningMills = [];
		Object.keys(this.mills).forEach(millId => {
			const mill = this.mills[millId];
			if (mill.isSpinning()) {
				spinningMills.push(mill);
			}
		});
		return spinningMills;
	}

	isInWorkingMill(position) {
		const millIds = this.squareMillIds(position);
		return QUARTER.symbols.some(q => this.millById(millIds[q]).isSpinning());
	}

	rotateVane(vaneId, spin, nTurns) {
		const vane = this.squareById(vaneId);
		// console.log(`rotating vane from ${vane.direction.toString()}`);
		let nextDirection = vane.direction;
		for (let i=0; i<nTurns; i++) {
			nextDirection = spin === MILLSPIN.CLOCKWISE ? QUARTER.after(nextDirection) : QUARTER.before(nextDirection);
		}
		vane.direction = nextDirection;
		// console.log(`rotated vane to ${vane.direction.toString()}`);

		QUARTER.symbols.forEach(q => {
			const mill = this.millById(vane.millIds[q]);
			// console.log(`determining mill spin for mill at ${q.toString()} `, mill);
			mill.spin = determineMillSpin(mill.vaneIds, this.squares);
		});
	}

	placeMarket() {
		let marketPosition = this.randomPosition();
		while (Object.values(this.squareMillIds(marketPosition)).some(id => this.millById(id).isSpinning())) {
			marketPosition = this.randomPosition();
		}
		return marketPosition;
	}

	vectorToMarket(fromPosition) {
		let deltaX = this.marketPosition.x - fromPosition.x;
		let deltaY = this.marketPosition.y - fromPosition.y;
		if (Math.abs(deltaX) > this.width/2) {
			deltaX = (this.width - Math.abs(deltaX)) * Math.sign(deltaX) * -1;
		}
		if (Math.abs(deltaY) > this.height/2) {
			deltaY = (this.height - Math.abs(deltaY)) * Math.sign(deltaY) * -1;
		}
		const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
		const angle = Math.atan2(deltaY, deltaX);
		return { magnitude, angle };
	}

	harvestGrain(field) {
		field.content = FIELD_CONTENT.MEADOW;
	}
}
