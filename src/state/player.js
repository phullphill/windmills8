import { Path } from './path';
import { Step } from './step';

export class Player {

	constructor({id, name , scores, factors, costs, initialPosition}) {
		this.id = id;
		this.name = name;
		this.path = new Path(initialPosition);
		this.scores = scores;
		this.factors = factors;
		this.costs = costs;
	}

	get position() {
		return this.path.lastStep.position;
	}

	isAt(position) {
		return this.path.lastStep.isAt(position);
	}

	get canMove() {
		return ["grain", "flour", "bread"].some(c => this.scores[c] >= this.costs.step[c]);
	}

	payForStep(board) {
		if (board.isInWorkingMill(this.position)) {
			return true;
		}
		const payWith = ["grain", "flour", "bread"].find(c => this.scores[c] >= this.costs.step[c]);
		if (!payWith) {
			return false;
		}
		this.scores[payWith] -= this.costs.step[payWith];
		return true;
	}

	takeStep(board, toDirection) {
		const lastPosition = this.position;
		const nextPosition = board.nextPositionFrom(lastPosition, toDirection);
		const nextStep = new Step(toDirection, nextPosition);
		this.path.steps.push(nextStep);

		const startInMill = board.isInWorkingMill(lastPosition);
		const endInMill = board.isInWorkingMill(nextPosition);
		if (startInMill && endInMill && this.scores.grain >= this.factors.grindPerStep) {
			this.scores.grain -= this.factors.grindPerStep;
			this.scores.flour += (this.factors.grindPerStep * this.factors.grain2flour);
		}
	}

	get canRotateVane() {
		return ["grain", "flour", "bread"].some(c => this.scores[c] >= this.costs.rotateVane[c]);
	}

	payForRotateVane() {
		const payWith = ["grain", "flour", "bread"].find(c => this.scores[c] >= this.costs.rotateVane[c]);
		if (!payWith) {
			return false;
		}
		this.scores[payWith] -= this.costs.rotateVane[payWith];
		return true;
	}

	payForHarvest() {
		return true;
	}

	harvestGrain() {
		this.scores.grain += this.factors.field2grain;
	}

}
