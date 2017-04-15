import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../game';
import { BoardUI } from '../board';
import { StatusBarUI } from '../status';

const squareSize = 40;

function mapStateToProps(state) {
	return {
		board: state.board,
		player: state.player,
		squareSize,
		portWidth: state.portWidth,
		portHeight: state.portHeight,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export const WindmillsApp = connect(mapStateToProps, mapDispatchToProps)(
	class WindmillsApp extends Component {

		static contextTypes = {
			store: PropTypes.object.isRequired
		};

		static propTypes = {
			actions: PropTypes.object.isRequired
		};

		render() {
			// console.log('render game');
			return (
				<div className="windmills-app">
					<BoardUI {...this.props} />
					<StatusBarUI {...this.props} />
				</div>
			);
		}
	}
);
