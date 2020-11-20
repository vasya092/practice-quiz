import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{

    state = {
        results: {}, // {[id]: success error}
        ActiveQuestion: 0,
        isFinished: false,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 0,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                id: 1,
                question: 'Основание Санкт-Петербурга',
                rightAnswerId: 3,
                answers: [
                    {text: '1702', id: 1},
                    {text: '1307', id: 2},
                    {text: '1703', id: 3},
                    {text: '1705', id: 4}
                ]
            },
        ]
    }

    onAnswerClickHandler = (rightId) => {
       
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.ActiveQuestion]
        const results = this.state.results

        if(question.rightAnswerId === rightId){
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[rightId]: 'success'},
                results: results
            })
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState(
                        {
                            ActiveQuestion: this.state.ActiveQuestion+1,
                            answerState: null
                        }
                    )
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[rightId]: 'error'},
                results: results
            })
        }

        
    }
    isQuizFinished() {
        return this.state.ActiveQuestion+1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            ActiveQuestion: 0,
            answerState: null, 
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log('Quiz id = ', this.props.match.params.id)
    } 

    render() {
        return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>   
                <h1>Вопросы</h1>
                {
                    this.state.isFinished 
                    ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                      />
                    : <ActiveQuiz
                        answers={this.state.quiz[this.state.ActiveQuestion].answers}
                        question={this.state.quiz[this.state.ActiveQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLenght={this.state.quiz.length}
                        answerNumber={this.state.ActiveQuestion+1}
                        state={this.state.answerState}
                    />
                }
            </div>
        </div>
        )
    }
}

export default Quiz