import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
	return {
		modal: state.modal,
	};
}

export const ModalUI = connect(mapStateToProps)(
    class ModalUI extends Component {
        render() {
            const { modal } = this.props;
            if (!modal.isOpen) {
                return null;
            }
            return (
                <modal.component {...modal.componentProps} />
            );
        }
    }
)
