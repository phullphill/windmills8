import cloneDeep from 'lodash.clonedeep';
import { register } from '../Reduxify';
import { OPEN_MODAL, CLOSE_MODAL } from './ModalActions';

const initialState = () => {
	return {
		component: '',
        componentProps: '',
        isOpen: false,
	};
};

function openModal(state, payload) {
	console.log(`openModal `, payload);
    const newState = cloneDeep(state);
    newState.component = payload.component;
    newState.componentProps = payload.componentProps;
    newState.isOpen = true;
    return newState;
}

function closeModal(state, payload) {
	const newState = cloneDeep(state);
	newState.isOpen = false;
	return newState;
}

const modalStore = (state = initialState(), action = {}) => {
	const payload = action.payload;
	switch (action.type) {

		case OPEN_MODAL:
			return openModal(state, payload);

		case CLOSE_MODAL:
			return closeModal(state, payload);

		default:
			return state;

	}
};

register.reducer({ modal: modalStore })
