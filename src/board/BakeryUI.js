
import React, { Component } from 'react';
import { COMPASS } from '../common';
import { PathMarkers } from '../pathMarkers';

export class BakeryUI extends Component {

	constructor(props) {
		super(props);
		this.onStep = this.onStep.bind(this);
		this.onBake = this.onBake.bind(this);
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

	getBakeryStyle(bakery, squareSize) {
		return {
			width: `${squareSize}px`,
			height: `${squareSize}px`,
			backgroundColor: 'brown',
			overflow: 'hidden',
		};
	}

	getBakeryDoorStyle(bakery, squareSize) {
		const direction = bakery.doorDirection;
		const posnStyle = {
			[COMPASS.NORTH]: {  top: `-${squareSize * 0.4}px`, left: `${squareSize * 0.1}px` },
			[COMPASS.SOUTH]: {  bottom: `-${squareSize * 0.6}px`, left: `${squareSize * 0.1}px` },
			[COMPASS.EAST]: {  right: `-${squareSize * 0.6}px`, top: `${squareSize * 0.1}px` },
			[COMPASS.WEST]: {  left: `-${squareSize * 0.4}px`, top: `${squareSize * 0.1}px` },
		};
		const style = {
			width: `${squareSize * 0.8}px`,
			height: `${squareSize * 0.8}px`,
			borderRadius: `${squareSize * 0.4}px`,
			backgroundColor: 'white',
			position: 'relative',
			...posnStyle[direction],
		};
		return style;
	}

	onBake(e) {
		e.preventDefault();
		const { bakery } = this.props;
		this.props.actions.bakeBread(bakery);
	}

	onStep(e) {
		e.preventDefault();
		this.props.actions.movePlayer(this.props.directionToNext);
	}

	render() {
		const { player, bakery, colIndex, squareSize, isPossibleNextSquare, directionToNext } = this.props;
		const canBake = player.isAt(bakery.position);
		return (
			<div style={this.getWrapperStyle(colIndex)}
			     onClick={isPossibleNextSquare ? this.onStep : canBake ? this.onBake : () => {}} >
				<div style={this.getBakeryStyle(bakery, squareSize)} >
					<div style={this.getBakeryDoorStyle(bakery, squareSize)} />
				</div>
				<PathMarkers
					player={player}
					position={bakery.position}
					squareSize={squareSize}
					isPossibleNextSquare={isPossibleNextSquare}
					directionToNext={directionToNext}
				/>
			</div>
		);
	}

}
