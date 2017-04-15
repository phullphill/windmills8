import React from 'react';
import { PropTypes } from 'prop-types';
import { COMPASS } from '../common';

export function StepMarker({ step, nextStep, squareSize, strokeWidth, colour }) {

	const pathPoint = (d) => {
		const factors = {
			[COMPASS.SOUTH]: [0.5, 0.0, 0.5, 0.3],
			[COMPASS.WEST]:  [1.0, 0.5, 0.6, 0.5],
			[COMPASS.NORTH]: [0.5, 1.0, 0.5, 0.6],
			[COMPASS.EAST]:  [0.0, 0.5, 0.3, 0.5],
		};

		return (d ? factors[d] : [0.5, 0.5, 0.5, 0.5]).map(f => f*squareSize);
	};

	let [x1, y1, cx1, cy1] = pathPoint(step.inDirection);
	let [x2, y2, cx2, cy2] = pathPoint(nextStep ? COMPASS.opposite(nextStep.inDirection) : null);

	return (
		<svg width={squareSize} height={squareSize} style={{position: 'absolute', top: '0px'}} >
			<path stroke="#F00" strokeWidth="5px" fillOpacity="0" d={`M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`} />
		</svg>
	)

}
