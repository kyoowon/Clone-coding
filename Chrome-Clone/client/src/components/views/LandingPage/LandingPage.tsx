import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.scss';
function LandingPage(): ReactElement {
    // axios를 통한 server에 요청
    useEffect(() => {
        axios.get('/api/hello').then((response) => console.log(response))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout').then((response) => console.log(response.data))
    }

    return (
        <div className = "landing">
            <h1>시작 페이지</h1>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage
