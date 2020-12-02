import { CREATE_QUIZ_QUESTION, CREATE_QUIZ_RESET } from "../actions/actionTypes"

const initialState = {
    quiz: []
}

export function createReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_QUIZ_QUESTION: {
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        }
        case CREATE_QUIZ_RESET: {
            return {
                ...state,
                quiz: []
            }
        }
        default: {
            return state
        }
    }
}