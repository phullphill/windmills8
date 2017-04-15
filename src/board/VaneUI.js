
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { COMPASS, QUARTER, CONTENT } from '../common';
import { PathMarkers } from '../path';

const isOpenTo = (vaneDirection, direction) => {
	switch (direction) {
		case COMPASS.NORTH:
			return vaneDirection === QUARTER.SOUTHEAST || vaneDirection === QUARTER.SOUTHWEST;
			break;
		case COMPASS.EAST:
			return vaneDirection === QUARTER.SOUTHWEST || vaneDirection === QUARTER.NORTHWEST;
			break;
		case COMPASS.SOUTH:
			return vaneDirection === QUARTER.NORTHWEST || vaneDirection === QUARTER.NORTHEAST;
			break;
		case COMPASS.WEST:
			return vaneDirection === QUARTER.NORTHEAST || vaneDirection === QUARTER.SOUTHEAST;
			break;
	}
};

export class VaneUI extends Component {

	constructor(props) {
		super(props);
		this.onStep = this.onStep.bind(this);
		this.onRotate = this.onRotate.bind(this);
	}

	getWrapperStyle(colIndex) {
		const { squareSize } = this.props;
		return {
			float: 'left',
			width: `${squareSize}px`,
			height: `${squareSize}px`,
			position: 'absolute',
			left: (colIndex*squareSize)+'px',
			transition: 'left 0.25s',
			transitionTimingFunction: 'linear'
		};
	}

	getVaneStyle(vane, squareSize) {
		const mills = this.props.board.mills;
		const isInOperatingMill = vane.isInOperatingMill(mills);
		const borderWidth = Math.floor(parseInt(squareSize) / 2);
		const vaneColour = isInOperatingMill ? 'blue' :  'black';
		const contentColour = 'white';
		const topColour = (!isOpenTo(vane.direction, COMPASS.NORTH) ? vaneColour : contentColour);
		const rightColour = (!isOpenTo(vane.direction, COMPASS.EAST) ? vaneColour : contentColour);
		const bottomColour = (!isOpenTo(vane.direction, COMPASS.SOUTH) ? vaneColour : contentColour);
		const leftColour = (!isOpenTo(vane.direction, COMPASS.WEST) ? vaneColour : contentColour);

		return {
			width: '0px',
			height: '0px',
			borderWidth: borderWidth+'px',
			borderStyle: 'solid',
			borderTopColor: topColour,
			borderRightColor: rightColour,
			borderBottomColor: bottomColour,
			borderLeftColor: leftColour,
		};
	}

	getMillPointsStyle() {
		return {
			height: '20px',
			width: '20px',
			color: 'white',
			fontSize: '1.5em',
			position: 'relative',
			left: '13px',
			top: '6px',
			zIndex: '100',
		};
	}

	onStep(e) {
		e.preventDefault();
		this.props.actions.movePlayer(this.props.directionToNext);
	}

	onRotate(e) {
		e.preventDefault();
		this.props.actions.rotateVane(this.props.vane.id, 1);
	}

	render() {
		const { player, vane, colIndex, squareSize, isPossibleNextSquare, directionToNext } = this.props;
		const canRotate = player.isAt(vane.position) && player.canRotateVane;
		return (
			<div style={this.getWrapperStyle(colIndex)}
			    onClick={isPossibleNextSquare ? this.onStep : canRotate ? this.onRotate : () => {}}
			>
				<div style={this.getVaneStyle(vane, squareSize)} />
				<PathMarkers
					player={player}
					position={vane.position}
					squareSize={squareSize}
					isPossibleNextSquare={isPossibleNextSquare}
					directionToNext={directionToNext}
				/>
			</div>
		);
	}

}
