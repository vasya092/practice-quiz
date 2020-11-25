import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Button from '../../components/UI/Button/Button'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'
import axios from '../../axios/axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

function createOptionControl(number) {
    return createControl({
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number
    }, {required: true})
  }
  

function createFormControls() {
    return {
        question: createControl({
          label: 'Введите вопрос',
          errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
      }
}

export default class QuizCreator extends Component {



    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    sibmitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls

        const quiz = this.state.quiz.concat()
        const index = quiz.length+1
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        
    }
    
    createQuizHandler = async (event) => {
        event.preventDefault()

        try {
            await axios.post('/quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    onChangeHandler = (value, controlName) => {
        
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
    
        formControls[controlName] = control
    
        this.setState({
          formControls,
          isFormValid: validateForm(formControls)
        })
        
    }
    renderControl() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
            <Auxiliary key={index}>
            <Input 
                label={control.label}
                value={control.value}
                touched={control.touched}
                valid={control.valid}
                shouldValidate={!!control.validation}
                errorMessage={control.errorMessage}
                onChange={event => this.onChangeHandler(event.target.value, controlName)}
            />
            {index === 0 ? <hr/> : null}
            </Auxiliary>
            )
            
        })
    }

 

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    render() {
        const select = <Select
                label="Выберите вариант"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    {text: 'Вариант 1', value: 1},
                    {text: 'Вариант 2', value: 2},
                    {text: 'Вариант 3', value: 3},
                    {text: 'Вариант 4', value: 4}
                ]}

            />
     
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.sumbitHandler}>
                    {this.renderControl()}
                    {select}
                    <Button
                            type='primary'
                            disabled={!this.state.isFormValid}
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            disabled={this.state.quiz.length === 0}
                            type='success'
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}