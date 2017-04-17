export const MOVE_PLAYER_REQUEST = 'MOVE_PLAYER_REQUEST';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const HARVEST_GRAIN_REQUEST = 'HARVEST_GRAIN_REQUEST';
export const HARVEST_GRAIN = 'HARVEST_GRAIN';
export const GRIND_FLOUR_REQUEST = 'GRIND_FLOUR_REQUEST';
export const GRIND_FLOUR = 'GRIND_FLOUR';
export const BAKE_BREAD_REQUEST = 'BAKE_BREAD_REQUEST';
export const BAKE_BREAD = 'BAKE_BREAD';
export const ROTATE_VANE_REQUEST = 'ROTATE_VANE_REQUEST';
export const ROTATE_VANE = 'ROTATE_VANE';

export const gameActions = {

	movePlayerRequest: (direction) => ({
		type: MOVE_PLAYER_REQUEST,
		payload: {
			direction,
		}
	}),
	movePlayer: (payload) => ({ type: MOVE_PLAYER, payload }),

	harvestGrainRequest: (field) => ({
		type: HARVEST_GRAIN_REQUEST,
		payload: {
			field,
		}
	}),
	harvestGrain: (payload) => ({ type: HARVEST_GRAIN, payload }),

	grindFlourRequest: (mill) => ({
		type: GRIND_FLOUR_REQUEST,
		payload: {
			mill,
		}
	}),
	grindFlour: (payload) => ({ type: GRIND_FLOUR, payload }),

	bakeBreadRequest: (bakery) => ({
		type: BAKE_BREAD_REQUEST,
		payload: {
			bakery,
		}
	}),
	bakeBread: (payload) => ({ type: BAKE_BREAD, payload }),

	rotateVaneRequest: (vane, nTurns=1) => ({
		type: ROTATE_VANE_REQUEST,
		payload: {
			vane,
			nTurns,
		}
	}),
	rotateVane: (payload) => ({ type: ROTATE_VANE, payload }),

};
