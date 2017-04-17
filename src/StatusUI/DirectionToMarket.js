import React from 'react';
import { PropTypes } from 'prop-types';

export function DirectionToMarket(props) {
	const { angle } = props;

	const compassStyle = {
		position: 'absolute',
		top: '-6px',
		right: '-6px',
		width: '46px',
		height: '46px',
		border: '2px solid goldenrod',
		borderRadius: '25px',
		backgroundColor: 'white',
		transform: `rotate(${angle}rad)`,
		transition: '0.5s transform ease-out',
		zIndex: '2',
	};

	const redPointerStyle = {
		position: 'absolute',
		top: '18px',
		right: '3px',
		width: '0px',
		height: '0px',
		borderLeft: '20px solid red',
		borderRight: '0px',
		borderTop: '5px solid transparent',
		borderBottom: '5px solid transparent',
	};

	const greyPointerStyle = {
		position: 'absolute',
		top: '18px',
		right: '23px',
		width: '0px',
		height: '0px',
		borderLeft: '0px',
		borderRight: '20px solid grey',
		borderTop: '5px solid transparent',
		borderBottom: '5px solid transparent',
	};

	return (
		<div style={compassStyle} >
			<div style={redPointerStyle} />
			<div style={greyPointerStyle} />
		</div>
	)

}
