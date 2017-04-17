
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const modalActions = {

	openModal: (component, componentProps) => ({
		type: OPEN_MODAL,
		payload: { component, componentProps },
	}),

	closeModal: () => ({
		type: CLOSE_MODAL,
		payload: {},
	}),

};
