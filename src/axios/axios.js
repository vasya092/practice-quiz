import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-react-3618f.firebaseio.com'
})