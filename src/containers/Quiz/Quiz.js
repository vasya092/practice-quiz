import React, {Component} from 'react'
import classes from './Quiz.module.css'
import {connect} from 'react-redux'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios'
import {fetchQuizById} from '../../store/actions/quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component{

    onAnswerClickHandler = (rightId) => {
       
        if(this.props.answerState) {
            const key = Object.keys(this.props.answerState)[0]
            if(this.props.answerState[key] === 'success') {
                return
            }
        }

        const question = this.props.quiz[this.props.activeQuestion]
        const results = this.props.results

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
                            activeQuestion: this.props.activeQuestion+1,
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
        return this.props.activeQuestion+1 === this.props.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null, 
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {
        console.log('Quiz id = ', this.props.match.params.id)
        this.props.fetchQuizById(this.props.match.params.id)
    } 

    render() {
        return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>   
                <h1>Вопросы</h1>
                {
                    this.props.loading || !this.props.quiz
                    ? <Loader/>
                    :  this.props.isFinished 
                    ? <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.retryHandler}
                      />
                    : <ActiveQuiz
                        answers={this.props.quiz[this.props.activeQuestion].answers}
                        question={this.props.quiz[this.props.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLenght={this.props.quiz.length}
                        answerNumber={this.props.activeQuestion+1}
                        state={this.props.answerState}
                    />
                }
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)