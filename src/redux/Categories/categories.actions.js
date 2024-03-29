import {
    GET_CATEGORY,
    CLEAR_CATEGORIES,
    GET_STANDARD_CATEGORIES,
    ADD_STANDARD_CATEGORIES,
    UPDATE_CATEGORY_WITH_STANDARD,
    ADD_PRODUCT,
    CLEAR_PRODUCTS
} from './categories.types'

export const getCategory = (category) => {
    return {
        type: GET_CATEGORY,
        payload: category
    }
}

export const clearCategories = () => {
    return {
        type: CLEAR_CATEGORIES
    }
}

export const getStandardCategories = (payload) => {
    return {
        type: GET_STANDARD_CATEGORIES,
        payload: payload
    }
}

export const addStandardCategory = (payload) => {
    return {
        type: ADD_STANDARD_CATEGORIES,
        payload: payload
    }
}

export const updateCategoryWithStandardInformation = (payload) => {
    return {
        type: UPDATE_CATEGORY_WITH_STANDARD,
        payload: payload
    }
}

export const addProduct = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload: payload
    }
}

export const clearProducts = () => {
    return {
        type: CLEAR_PRODUCTS
    }
}