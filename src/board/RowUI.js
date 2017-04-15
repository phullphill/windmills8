import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Position } from '../state';
import { VaneUI } from "./VaneUI";
import { FieldUI } from "./FieldUI";
import { BakeryUI } from "./BakeryUI";
import { MarketUI } from "./MarketUI";

export class RowUI extends Component {

	getRowStyle(rowIndex, squareSize) {
		return {
			position: 'absolute',
			left: '0px',
			top: (rowIndex*squareSize)+'px',
			transition: 'top 0.25s',
			transitionTimingFunction: 'linear'
		};
	}

	render() {
		const {board, player, rowIndex, y, squareSize, playerPosition, nextSquares} = this.props;
		const width = board.portWidth;
		const colOrdinates = board.getPortColOrdinates(playerPosition);

		let squares = [];
		for (let colIndex = 0; colIndex<width; colIndex++) {
			const x = colOrdinates[colIndex];
			const squarePosition = new Position(x, y);
			const square = board.squareAt(squarePosition);
			const isPossibleNextSquare = player.canMove && square.isOneOf(nextSquares);
			const directionToNext = (isPossibleNextSquare ? board.directionBetween(playerPosition, squarePosition) : null);

			if (square.constructor.name === 'Vane') {
				squares.push(
					<VaneUI key={x}
					        colIndex={colIndex}
					        {...this.props}
					        vane={square}
					        squareSize={squareSize}
					        isPossibleNextSquare={isPossibleNextSquare}
					        directionToNext={directionToNext}
					/>
				);
			} else if (square.constructor.name === 'Field') {
				squares.push(
					<FieldUI key={x}
					        colIndex={colIndex}
					        {...this.props}
					        field={square}
					        squareSize={squareSize}
							isPossibleNextSquare={isPossibleNextSquare}
							directionToNext={directionToNext}
					/>
				);

			} else if (square.constructor.name === 'Bakery') {
				squares.push(
					<BakeryUI key={x}
					         colIndex={colIndex}
					         {...this.props}
					         bakery={square}
					         squareSize={squareSize}
					         isPossibleNextSquare={isPossibleNextSquare}
					         directionToNext={directionToNext}
					/>
				);


			} else if (square.constructor.name === 'Market') {
				squares.push(
					<MarketUI key={x}
							colIndex={colIndex}
							{...this.props}
							market={square}
							squareSize={squareSize}
							isPossibleNextSquare={isPossibleNextSquare}
							directionToNext={directionToNext}
					/>
				);

			}
		}

		return (
			<div style={this.getRowStyle(rowIndex, squareSize)} >
				{squares}
			</div>
		);
	}
}
