import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { albumFormReducer } from '../reducers/albumFormReducer';
import { simpleFormReducer } from '../reducers/simpleFormReducer';
import { artistsReducer } from '../reducers/artistsReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    albumForm: albumFormReducer,
    simpleForm: simpleFormReducer,
    ui: uiReducer,
    artists: artistsReducer
})


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )     
);