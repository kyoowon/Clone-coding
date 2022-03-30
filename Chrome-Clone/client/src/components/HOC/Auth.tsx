import axios from 'axios'
import React, { Component, ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../_actions/user_action'

interface Props {
    
}

export default function (SpecificComponent : any, option? : any, adminRoute = null) {

    const Dispatch = useDispatch()

    // option의 종류
    // null - 아무나 접근이 가능한 페이지
    // false - 로그인을 하지 않은 user가 접근하는 페이지
    // true - 로그인한 유저가 접근하는 페이지

    function AuthenticationCheck(Props : Props) {
        useEffect(() => {
            Dispatch(auth())
        })

        return < SpecificComponent />
    }

    return (AuthenticationCheck)
}
