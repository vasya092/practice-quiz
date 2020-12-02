import React, {Component} from 'react'
import classes from './Quiz.module.css'
import {connect} from 'react-redux'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component{



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
                            onRetry={this.props.retryQuiz}
                      />
                    : <ActiveQuiz
                        answers={this.props.quiz[this.props.activeQuestion].answers}
                        question={this.props.quiz[this.props.activeQuestion].question}
                        onAnswerClick={this.props.quizAnswerClick}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)