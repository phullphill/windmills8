
export const gameSelectors = {
    player: {
        isAtMarket: (state) => {
            const playerPosition = state.player.position;
            return state.board.squareAt(playerPosition).isMarket();
        },
        canMove: (state) => state.player.canMove,
    },
}
