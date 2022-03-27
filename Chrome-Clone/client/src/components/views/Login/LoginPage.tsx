import React, { useState } from 'react'
import './LoginPage.scss'
import { useDispatch }from 'react-redux'
import loginUser from '../../../_actions/user_action'
import { response } from 'express'

export const Login = () => {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEamilHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setEmail(event.target.value)
    }

    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setPassword(event.target.value)
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let body ={
            email : Email,
            password : Password,
        }

        dispatch(loginUser(body))
        // dispatch - typeScrpit virsion update use
        // dispatch(loginUser(body)).then((response:any): any => {
        //     if (response.payload.loginSuccess) {

        //     }
        // })
    }

    return (
        <div className="loginPage">
            <h1>login</h1>
            <form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" placeholder="Email" value={Email} onChange={onEamilHandler}/>
                <label>password</label>
                <input type="pasword" placeholder="Email" value={Password} onChange={onPasswordHandler}/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}
