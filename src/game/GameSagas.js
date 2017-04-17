// @flow

import { take, takeEvery, fork, put, select } from 'redux-saga/effects';
import { register } from '../Reduxify';
import { modalActions, ModalAtMarket, ModalGameOver } from "../Modal";
import {
    MOVE_PLAYER_REQUEST,
    ROTATE_VANE_REQUEST,
    HARVEST_GRAIN_REQUEST,
    GRIND_FLOUR_REQUEST,
    BAKE_BREAD_REQUEST,
    gameActions,
} from "./GameActions";
import { gameSelectors } from './GameSelectors';

export function* checkNotifications() {
    const state = yield select();
    const playerIsAtMarket = gameSelectors.player.isAtMarket(state.game);
    const playerCanMove = gameSelectors.player.canMove(state.game);

    if (playerIsAtMarket) {
        yield put(modalActions.openModal(ModalAtMarket, {}));
    } else if (!playerCanMove) {
        yield put(modalActions.openModal(ModalGameOver, {}));
    }
}

export function* movePlayer(action) {
    yield put(gameActions.movePlayer(action.payload));
    yield checkNotifications();
}

export function* watchMovePlayerSaga() {
    yield takeEvery(MOVE_PLAYER_REQUEST, movePlayer);
}

export function* rotateVane(action) {
    yield put(gameActions.rotateVane(action.payload));
    yield checkNotifications();
}

export function* watchRotateVaneSaga() {
    yield takeEvery(ROTATE_VANE_REQUEST, rotateVane);
}

export function* harvestGrain(action) {
    yield put(gameActions.harvestGrain(action.payload));
    yield checkNotifications();
}

export function* watchHarvestGrainSaga() {
    yield takeEvery(HARVEST_GRAIN_REQUEST, harvestGrain);
}

export function* grindFlour(action) {
    yield put(gameActions.grindFlour(action.payload));
    yield checkNotifications();
}

export function* watchGrindFlourSaga() {
    yield takeEvery(GRIND_FLOUR_REQUEST, grindFlour);
}

export function* bakeBread(action) {
    yield put(gameActions.bakeBread(action.payload));
    yield checkNotifications();
}

export function* watchBakeBreadSaga() {
    yield takeEvery(BAKE_BREAD_REQUEST, bakeBread);
}

register.sagas([
    watchMovePlayerSaga,
    watchRotateVaneSaga,
    watchHarvestGrainSaga,
    watchGrindFlourSaga,
    watchBakeBreadSaga,
]);
