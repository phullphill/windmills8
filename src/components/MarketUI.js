
import React, { Component, PropTypes } from 'react';
import { PathMarkers } from './PathMarkers';

export class MarketUI extends Component {

	constructor(props) {
		super(props);
		this.onStep = this.onStep.bind(this);
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

	getMarketStyle(market, squareSize) {
		return {
			width: `${squareSize}px`,
			height: `${squareSize}px`,
			backgroundColor: 'red',
		};
	}

	onStep(e) {
		e.preventDefault();
		this.props.actions.movePlayer(this.props.directionToNext);
	}

	render() {
		const { player, market, colIndex, squareSize, isPossibleNextSquare, directionToNext } = this.props;
		return (
			<div style={this.getWrapperStyle(colIndex)} onClick={isPossibleNextSquare ? this.onStep : () => {}}>
				<div style={this.getMarketStyle(market, squareSize)} />
				<PathMarkers
					player={player}
					position={market.position}
					squareSize={squareSize}
					isPossibleNextSquare={isPossibleNextSquare}
					directionToNext={directionToNext}
				/>
			</div>
		);
	}

}
