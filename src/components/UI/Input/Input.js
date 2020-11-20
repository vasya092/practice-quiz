import React from 'react'
import classes from './Input.module.css'

const Input = props => {

    const cls = [classes.Input]

    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    function isValid({valid, touched, shouldValidate}) {
        return !valid && shouldValidate && touched
    }

    if(isValid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isValid(props) 
                    ? <span>{props.errorMessage}</span> || "Введите корректное значение"
                    : null
            }
           
        </div>
    )
}

export default Input