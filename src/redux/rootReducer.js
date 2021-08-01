import {combineReducers} from 'redux';

import categoriesReducer from './Categories/categories.reducer';

const rootReducer = combineReducers({
    categories: categoriesReducer,
});

export default rootReducer;