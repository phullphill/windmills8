import React, { PropTypes } from 'react';
import { COMPASS } from '../common';

export function NextStepMarker(props) {
	const { squareSize, colour, direction } = props;

	const size = squareSize * 0.25;
	const directionalCssProps = {
		[COMPASS.NORTH]: {
			borderTopWidth: `0px`,
			borderBottomColor: colour,
			left: `${size}px`,
			bottom: `${size+5}px`,

		},
		[COMPASS.EAST]: {
			borderRightWidth: `0px`,
			borderLeftColor: colour,
			left: '5px',
			bottom: `${size*3}px`,
		},
		[COMPASS.SOUTH]: {
			borderBottomWidth: `0px`,
			borderTopColor: colour,
			left: `${size}px`,
			bottom: `${squareSize-5}px`,
		},
		[COMPASS.WEST]: {
			borderLeftWidth: `0px`,
			borderRightColor: colour,
			bottom: `${size*3}px`,
			left: `${squareSize-size-5}px`,

		},
	}[direction];

	const markerStyle = {
		width: `0px`,
		height: `0px`,
		borderStyle: `solid`,
		borderWidth: size,
		borderColor: `transparent`,
		position: `relative`,
		zIndex: `1`,
		...directionalCssProps,
	};

	return (
		<div style={markerStyle} ></div>
	)
}
