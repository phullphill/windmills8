import { Step } from './Step';

export class Path {

	constructor(initialPosition) {
		const firstStep = new Step(null, initialPosition);
		this.steps = [ firstStep ];
	}

	get length() {
		return this.steps.length;
	}

	get firstStep() {
		return this.steps[0];
	}

	get lastStep() {
		return this.steps[this.length-1];
	}

	last4Steps() {
		if (this.length < 4) {
			return [];
		}
		return this.steps.slice(-4);
	}

	allStepsThrough(position) {
		let steps = [];
		const pathLength = this.length;
		this.steps.forEach((step, i) => {
			if (step.isAt(position)) {
				const nextStep = i === pathLength-1 ? null : this.steps[i+1];
				steps.push({
					step,
					nextStep
				})
			}
		});
		return steps;
	}

	appendStepTo(toDirection, toPosition) {
		const nextStep = new Step(toDirection, toPosition);
		this.steps.push(nextStep);
		return this.steps;
	}

	toString(withDirections) {
		return this.steps.map(s => s.toString(withDirections)).join(', ');
	}

}
