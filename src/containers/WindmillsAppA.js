import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../state';
import { BoardUI, StatusBarUI } from '../components';

const squareSize = 40;

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

export default connect(mapStateToProps, mapDispatchToProps)(WindmillsApp);
