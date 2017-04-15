export const MOVE_PLAYER = 'MOVE_PLAYER';
export const ROTATE_VANE = 'ROTATE_VANE';
export const HARVEST_GRAIN = 'HARVEST_GRAIN';
export const GRIND_FLOUR = 'GRIND_FLOUR';
export const BAKE_BREAD = 'BAKE_BREAD';

export const actions = {

	movePlayer: (direction) => ({
		type: MOVE_PLAYER,
		payload: {
			direction,
		}
	}),

	harvestGrain: (field) => ({
		type: HARVEST_GRAIN,
		payload: {
			field,
		}
	}),

	grindFlour: (mill) => ({
		type: GRIND_FLOUR,
		payload: {
			mill,
		}
	}),

	bakeBread: (bakery) => ({
		type: BAKE_BREAD,
		payload: {
			bakery,
		}
	}),

	rotateVane: (vane, nTurns=1) => ({
		type: ROTATE_VANE,
		payload: {
			vane,
			nTurns,
		}
	}),

};
