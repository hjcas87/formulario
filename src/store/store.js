import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { artistsReducer } from '../reducers/artistsReducer';
import { formReducer } from '../reducers/formReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    form: formReducer,
    ui: uiReducer,
    artists: artistsReducer
})


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )     
);