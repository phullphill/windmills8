import {
	MOVE_PLAYER,
	ROTATE_VANE
} from '../constants';

export function tickTime() {
	return {
		type: TIME_TICK,
		payload: {}
	};
}

export function tickerStarted() {
	return {
		type: TICKER_STARTED,
		payload: {}
	};
}

export function rotateVane(vane, nTurns) {
	return {
		type: ROTATE_VANE,
		payload: {
			vane: vane,
			nTurns: nTurns
		}
	};
}

export function movePlayer(player, direction) {
	return {
		type: MOVE_PLAYER,
		payload: {
			player,
			direction
		}
	};
}
