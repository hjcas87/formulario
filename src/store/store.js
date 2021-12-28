import { combineReducers, createStore } from 'redux';
import { formReducer } from '../reducers/formReducer';
import { uiReducer } from '../reducers/uiReducer';


const reducers = combineReducers({
    form: formReducer,
    ui: uiReducer
})


export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);