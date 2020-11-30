import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR} from "./actionTypes"
import axios from '../../axios/axios'

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {   
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест ${index+1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            console.log(error)
            dispatch(fetchQuizesError(error))
        }
    }
}

    
export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${id}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizError(error))
        }
    }
}

export function fetchQuizesStart() {
    console.log("FETCH_QUIZES_START")
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuizSuccess(quiz) {
    
    console.log("FETCH_QUIZES_SUCCESS", quiz)
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
}