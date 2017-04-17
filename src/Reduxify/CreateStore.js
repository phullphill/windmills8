import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { ignoreActions } from './IgnoreActions';

const DEFAULT_IGNORABLE_ACTIONS = ["EFFECT_TRIGGERED", "EFFECT_RESOLVED", "EFFECT_REJECTED"];

const registeredConfig = {
    reducers: {},
    sagas: [],
    ignorableActions: DEFAULT_IGNORABLE_ACTIONS,
};

const sagaMiddleware = createSagaMiddleware();

export const register = {
    reducer: (reducer) => {
        registeredConfig.reducers = { ...registeredConfig.reducers, ...reducer };
    },

    sagas: (sagas) => {
        registeredConfig.sagas.push(...sagas);
    },

    ignorableActions: (ignorableActions) => {
        registeredConfig.ignorableActions.push(...ignorableActions);
    },
}

function createLoggerMiddleware() {
    return createLogger({
        collapsed: true,
        predicate: (getState, action) => (
            !registeredConfig.ignorableActions.includes(action.type)
        ),
    });
}

function composeMiddleware(env) {
    const appliedMiddleware = applyMiddleware(
        thunk,
        sagaMiddleware,
        (env === 'production' ? null : createLoggerMiddleware()),
        ignoreActions(registeredConfig.ignorableActions),
    );
    return compose(appliedMiddleware);
}

function* composeRootSaga(sagas) {
    yield sagas.map(saga => fork(saga));
}

export function createStoreAndMiddleware(env) {
    const rootStore = combineReducers(registeredConfig.reducers);
    const middleware = composeMiddleware(env);
    const store = createStore(rootStore, middleware);
    sagaMiddleware.run(composeRootSaga, registeredConfig.sagas);
    store.close = () => store.dispatch(END);
    return store;
}
