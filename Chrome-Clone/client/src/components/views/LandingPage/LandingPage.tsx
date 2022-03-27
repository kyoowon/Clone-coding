import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.scss';
function LandingPage(): ReactElement {
    // axios를 통한 server에 요청
    useEffect(() => {
        axios.get('/api/hello').then((response) => console.log(response))
    }, [])

    return (
        <div className = "landing">
            <h1>시작 페이지</h1>
        </div>
    )
}

export default LandingPage
