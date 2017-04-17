import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameActions } from '../Game';
import { modalActions } from '../Modal';
import { BoardUI } from '../BoardUI';
import { StatusBarUI } from '../StatusUI';
import { ModalUI, ModalAtMarket, ModalGameOver } from '../Modal';

function mapStateToProps(state) {
	return {
		board: state.game.board,
		player: state.game.player,
		squareSize: state.game.squareSize,
		portWidth: state.game.portWidth,
		portHeight: state.game.portHeight,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		gameActions: bindActionCreators(gameActions, dispatch),
		modalActions: bindActionCreators(modalActions, dispatch),
	};
}

export const WindmillsApp = connect(mapStateToProps, mapDispatchToProps)(
	class WindmillsApp extends Component {

		static propTypes = {
			board: PropTypes.object.isRequired,
			player: PropTypes.object.isRequired,
			squareSize: PropTypes.number.isRequired,
			portWidth: PropTypes.number.isRequired,
			portHeight: PropTypes.number.isRequired,
		};

		render() {
			return (
				<div className="windmills-app">
					<BoardUI {...this.props} />
					<StatusBarUI {...this.props} />
					<ModalUI />
				</div>
			);
		}
	}
);
