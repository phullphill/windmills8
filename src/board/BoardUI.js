import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { RowUI } from './RowUI';
import { Position } from '../state';

export class BoardUI extends Component {

	getBoardStyle(height, width, squareSize) {
		return {
			position: 'absolute',
			top: (-1*squareSize)+'px',
			left: (-1*squareSize)+'px',
			height: ((height-1)*squareSize)+'px',
			width: ((width-1)*squareSize)+'px',
			overflow: 'hidden'
		};
	}

	getPort(player, portWidth, portHeight) {
		const px = player.position.x - (portWidth/2);
		const py = player.position.y - (portHeight/2);
		return {
			topLeft: new Position(px, py),
			bottomRight: new Position(px + portWidth, py+portHeight)
		};
	}

	render() {
		const { board, player, squareSize } = this.props;
		const height = board.portHeight;
		const width = board.portWidth;
		const playerPosition = player.position;
		const rowOrdinates = board.getPortRowOrdinates(playerPosition);
		const nextSquares = board.playerNextSquares(player);
		// console.log(`nextSquares ${nextSquares.map(s => s.position.toString()).join(',')}`);
		let rows = [];
		for (let rowIndex=0; rowIndex<height; rowIndex++) {
			const y = rowOrdinates[rowIndex];
			rows.push(
				<RowUI key={y} {...this.props}
				     rowIndex={rowIndex}
				     y={y}
				     squareSize={squareSize}
				     playerPosition={playerPosition}
				     nextSquares={nextSquares}
				/>
			);
		}

		return (
			<div id='board' style={this.getBoardStyle(height, width, squareSize)}>
				{rows}
			</div>
		);

	}

}
