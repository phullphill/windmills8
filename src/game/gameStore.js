
import cloneDeep from 'lodash.clonedeep';
import {
	MILLSPIN,
	FIELD_CONTENT,
} from '../Common';
import { Board, Player, Step } from '../StateObject';
import { register } from '../Reduxify';
import { modalActions, ModalAtMarket, ModalGameOver } from '../Modal';
import {
	ROTATE_VANE,
	MOVE_PLAYER,
	HARVEST_GRAIN,
	GRIND_FLOUR,
	BAKE_BREAD,
	CHECK_NOTIFICATIONS,
} from './GameActions';
import { gameSelectors } from './GameSelectors';

const initialStateOptions = {
	id: 1,
	width: 16,
	height: 16,
	portWidth: 7,
	portHeight: 11,
	squareSize: 40,
	boardProbabilities: {
		bakery: 2,
		field: 5,
	},
	initialPlayerScores: {
		grain: 0,
		flour: 0,
		bread: 0,
		coins: 0,
	},
	conversionFactors: {
		field2grain: 50,
		grindPerStep: 6,
		grain2flour: 2,
		flour2bread: 4,
		bread2coins: 1,
	},
	actionCosts: {
		step: {
			grain: 1,
			flour: 2,
			bread: 8,
		},
		rotateVane: {
			grain: 6,
			flour: 12,
			bread: 48,
		},
		bakeBread: {
			grain: 2,
			flour: 24,
		}
	},
};

const initialState = (options) => {
	const {
		conversionFactors,
		actionCosts,
		initialPlayerScores
	} = options;
	const board = new Board(options);
	const grainField = board.allFields().filter(f => f.content === FIELD_CONTENT.WHEAT)[0];
	const player = new Player({
		id: 1,
		name: 'phill',
		scores: initialPlayerScores,
		factors: conversionFactors,
		costs: actionCosts,
		initialPosition: grainField.position,
	});
	const state = {
		board,
		player,
		portWidth: options.portWidth,
		portHeight: options.portHeight,
		squareSize: options.squareSize,
	};
	return state;
};

function checkNotifications(state) {

	// has player reached market?
	const playerIsAtMarket = gameSelectors.player.isAtMarket(state);
	const playerCanMove = gameSelectors.player.canMove(state);

	if (playerIsAtMarket) {
		modalActions.openModal(ModalAtMarket, {});
	} else if (!playerCanMove) {
		modalActions.openModal(ModalGameOver, {});
	}

	return state;
}

function movePlayer(state, toDirection) {
	const newState = cloneDeep(state);

	if (newState.player.payForStep(newState.board)) {
		newState.player.takeStep(newState.board, toDirection);
	}
	return checkNotifications(newState);
}

function rotateVane(state, currentVaneId, nTurns) {
	const newState = cloneDeep(state);

	if (newState.player.payForRotateVane()) {
		newState.board.rotateVane(currentVaneId, MILLSPIN.CLOCKWISE, nTurns);
	}
	return checkNotifications(newState);
}

function harvestGrain(state, field) {
	const newState = cloneDeep(state);

	if (newState.player.payForHarvest()) {
		const newField = newState.board.squareById(field.id);
		newState.board.harvestGrain(newField);
		newState.player.harvestGrain();
	}

	return checkNotifications(newState);
}

function grindFlour(state, mill) {
	const newState = cloneDeep(state);
	return checkNotifications(newState);
}

function bakeBread(state, bakery) {
	const newState = cloneDeep(state);

	if (newState.player.payForBakeBread()) {
		newState.player.bakeBread();
	}

	return checkNotifications(newState);
}

function sellGoods(state) {
	const newState = cloneDeep(state);
	return checkNotifications(newState);
}

const gameStore = (state = initialState(initialStateOptions), action = {}) => {
	const payload = action.payload;
	switch (action.type) {

		case ROTATE_VANE:
			return rotateVane(state, payload.vane, payload.nTurns);

		case MOVE_PLAYER:
			return movePlayer(state, payload.direction);

		case HARVEST_GRAIN:
			return harvestGrain(state, payload.field);

		case GRIND_FLOUR:
			return grindFlour(state, payload.mill);

		case BAKE_BREAD:
			return bakeBread(state, payload.bakery);

		default:
			return state;

	}
};

register.reducer({ game: gameStore });
