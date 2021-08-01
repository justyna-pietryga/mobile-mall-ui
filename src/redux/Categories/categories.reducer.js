import {
    GET_CATEGORY,
    CLEAR_CATEGORIES,
    GET_STANDARD_CATEGORIES,
    ADD_STANDARD_CATEGORIES,
    UPDATE_CATEGORY_WITH_STANDARD
} from './categories.types'
import _ from "lodash";

const INITIAL_STATE = {
    categories: [],
    standardCategories: [],
    categoriesWithStandard: new Map()
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, {...action.payload, standardCategory: {name: ''}}],
            }
        case CLEAR_CATEGORIES:
            return {
                ...state,
                categories: [],
            }
        case GET_STANDARD_CATEGORIES:
            return {
                ...state,
                standardCategories: action.payload,
            }
        case ADD_STANDARD_CATEGORIES:
            const standardNames = _.map(state.standardCategories, category => category.name)
            return {
                ...state,
                standardCategories: !_.includes(standardNames, action.payload) ?
                    [...state.standardCategories, {name: action.payload}] : [...state.standardCategories],
            }
        case UPDATE_CATEGORY_WITH_STANDARD:
            const stateCategories = state.categories
                .map(category => {
                    if(category.name === action.payload.name){
                        return action.payload
                    }
                    else {
                        return category
                    }
                })

            return {
                ...state,
                categories: [...stateCategories],
            }
        default:
            return state;
    }
}

export default reducer;