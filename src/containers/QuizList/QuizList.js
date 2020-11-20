import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from 'axios'


export default class QuizList extends Component {

    renderQuizes() {
        return [1,2,3].map((quiz, index)=> {
            return (
                <li key={index}>
                    <NavLink
                    to={'/quiz/' + quiz}
                    >
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://quiz-react-3618f.firebaseio.com/quiz.json').then(response => {console.log(response)})
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}