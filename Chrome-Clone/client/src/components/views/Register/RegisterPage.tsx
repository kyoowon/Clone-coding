import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import './RegisterPage.scss'
interface Props {
    
}

export const Register = (props: Props) => {

    const dispatch = useDispatch()


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")

    const onEamilHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setEmail(event.target.value)
    }

    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setPassword(event.target.value)
    }
    const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setConfirmPassword(event.target.value)
    }

    const onFirstNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setFirstName(event.target.value)
    }
    const onLastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setLastName(event.target.value)
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert("현재 비밀번호와 비밀번호 확인이 다릅니다.")

        }
        let body = {
            email : Email,
            name : FirstName,
            lastname : LastName,
            password : Password,
        }
        dispatch(registerUser(body))
    }

    return (
        <div className="registerPage">
            <h1>register</h1>
            <form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" placeholder="Email" value={Email} onChange={onEamilHandler}/>
                <label>first name</label>
                <input type="text" placeholder="first name" value={FirstName} onChange={onFirstNameHandler}/>
                <label>last name</label>
                <input type="text" placeholder="last name" value={LastName} onChange={onLastNameHandler}/>
                <label>password</label>
                <input type="password" placeholder="password" value={Password} onChange={onPasswordHandler}/>
                <label>confirm password</label>
                <input type="password" placeholder="confirm password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <button>
                    Login
                </button>
            </form>
        </div>
    )
}
