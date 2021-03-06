
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FIELD_CONTENT } from '../Common';
import { PathMarkers } from '../PathUI';

export class FieldUI extends Component {

	constructor(props) {
		super(props);
		this.onStep = this.onStep.bind(this);
		this.onHarvest = this.onHarvest.bind(this);
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

	getFieldStyle(field, squareSize) {
		return {
			width: `${squareSize}px`,
			height: `${squareSize}px`,
			backgroundColor: (field.content === FIELD_CONTENT.MEADOW ? 'green' : 'gold'),
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
		this.props.gameActions.movePlayerRequest(this.props.directionToNext);
	}

	onHarvest(e) {
		e.preventDefault();
		const { player, field } = this.props;
		this.props.gameActions.harvestGrainRequest(field);
	}

	render() {
		const { player, field, colIndex, squareSize, isPossibleNextSquare, directionToNext } = this.props;
		const canHarvest = player.isAt(field.position) && field.content === FIELD_CONTENT.WHEAT;

		return (
			<div style={this.getWrapperStyle(colIndex)}
			     onClick={isPossibleNextSquare ? this.onStep : canHarvest ? this.onHarvest : () => {}} >
				<div style={this.getFieldStyle(field, squareSize)} />
				<PathMarkers
					player={player}
					position={field.position}
					squareSize={squareSize}
					isPossibleNextSquare={isPossibleNextSquare}
					directionToNext={directionToNext}
				/>
			</div>
		);
	}

}
