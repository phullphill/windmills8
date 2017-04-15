import React, { PropTypes } from 'react';

export function DistanceToMarket(props) {
	const { distance } = props;

	const wrapperStyle = {
		position: 'absolute',
		top: '0px',
		right: '30px',
		width: '40px',
		height: '25px',
		padding: '5px',
		border: '2px solid goldenrod',
		borderRadius: '5px',
		backgroundColor: 'white',
		zIndex: '1',
		fontSize: '1.2em',
	};

	const distanceStyle = {
		color: 'black',
	};

	const formattedDistance = distance.toFixed(1);

	return (
		<div style={wrapperStyle} >
			<span style={distanceStyle} >{formattedDistance}</span>
		</div>
	)

}
