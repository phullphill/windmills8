import { combineReducers } from 'redux';

import { gameStore } from './gameStore';

const rootStore = combineReducers({
	gameStore
});

export default rootStore;
