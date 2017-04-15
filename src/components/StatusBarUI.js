import React, { Component, PropTypes } from 'react';
import { DirectionToMarket } from './DirectionToMarket';
import { DistanceToMarket } from './DistanceToMarket';

export class StatusBarUI extends Component {

	getBarStyle() {
		const { board, squareSize } = this.props;
		return {
			position: 'absolute',
			left: '0px',
			top: `${(board.portHeight-2) * squareSize}px`,
			height: `${squareSize}px`,
			width: `${(board.portWidth-2) * squareSize}px`,
			backgroundColor: 'lightBlue',
		};
	}

	render() {
		const { player, board, squareSize } = this.props;
		const { angle, magnitude } = board.vectorToMarket(player.position);

		return (
			<div style={this.getBarStyle()} >
				<PlayerScoreUI {...this.props} />
				<DistanceToMarket distance={magnitude} />
				<DirectionToMarket angle={angle} />
			</div>
		);
	}
}

export class PlayerScoreUI extends Component {

	getScoresStyle() {
		const { board, squareSize } = this.props;
		return {
			margin: '0px',
			padding: '2px',
			fontFamily: 'roboto',
			fontSize: '1em',
			color: 'black',
			columnWidth: '70px',
		};
	}

	getScoreStyle() {
		return {
			listStyle: 'none',
		};
	}

	render() {
		const { player, board } = this.props;
		return (
			<ul style={this.getScoresStyle()} >
				<li style={this.getScoreStyle()}>grain: {player.scores.grain}</li>
				<li style={this.getScoreStyle()}>flour: {player.scores.flour}</li>
				<li style={this.getScoreStyle()}>bread: {player.scores.bread}</li>
				<li style={this.getScoreStyle()}>coins: {player.scores.coins}</li>
			</ul>
		);
	}
}
