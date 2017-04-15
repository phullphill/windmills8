
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StepMarker } from './StepMarker';
import { PathEndMarker } from './PathEndMarker';
import { NextStepMarker } from './NextStepMarker';

export function PathMarkers(props) {

	const { player, position,  squareSize, isPossibleNextSquare, directionToNext } = props;

	const getPathWrapperStyles = () => {
		return { pointerEvents: 'none' };
	};

	return (
		<div style={getPathWrapperStyles()}>
			<PathEndMarker {...props} />
			{player.path.allStepsThrough(position).map((step, i) =>
				<StepMarker
					key={i}
					step={step.step}
					nextStep={step.nextStep}
					squareSize={squareSize}
					strokeWidth={squareSize/4}
					colour="red"
				/>
			)}
			{isPossibleNextSquare &&
				<NextStepMarker
					direction={directionToNext}
					squareSize={squareSize}
					colour="red"
				/>
			}
		</div>
	);

}
