import { Path } from './Path';
import { Step } from './Step';

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

	pay(payFor, payWith) {
		this.scores[payWith] -= this.costs[payFor][payWith];
	}

	payForStep(board) {
		if (board.isInWorkingMill(this.position)) {
			return true;
		}
		const payWith = ["grain", "flour", "bread"].find(c => this.scores[c] >= this.costs.step[c]);
		if (!payWith) {
			return false;
		}
		this.pay('step', payWith);
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
		this.pay('rotateVane', payWith);
		return true;
	}

	payForHarvest() {
		return true;
	}

	harvestGrain() {
		this.scores.grain += this.factors.field2grain;
	}

	payForBakebread() {
		const payWith = ["grain", "flour"].find(c => this.scores[c] >= this.costs.bakeBread[c]);
		if (!payWith) {
			return false;
		}
		this.pay('bakeBread', payWith);
		return true;
	}

	bakeBread() {
		this.scores.bread += this.scores.flour * this.factors.flour2bread;
		this.scores.flour = 0;
	}

}
