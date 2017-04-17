import React from 'react';
import { PropTypes } from 'prop-types';

export function PathEndMarker(props) {
	const { player, position, squareSize } = props;

	let pathEnd = null;
	if (player.path.firstStep.isAt(position)) {
		pathEnd = 'begin';
	} else if (player.path.lastStep.isAt(position)) {
		pathEnd = 'end';
	} else {
		return null;
	}

	const size = squareSize/3;
	const markerStyle = {
		width: `${size-5}px`,
		height: `${size-5}px`,
		border: `5px solid red`,
		borderRadius: `50%`,
		backgroundColor: (pathEnd === 'begin' ? 'white' : 'red'),
		marginTop: `-${squareSize/2 + size/2 + 2.5}px`,
		marginLeft: `${squareSize/2 - size/2 - 2.5}px`,
		position: `relative`,
		zIndex: `1`,
	};

	return (
		<div style={markerStyle} ></div>
	)
}
