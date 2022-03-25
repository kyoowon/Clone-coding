import React, { ReactElement, useEffect } from 'react'
import axios from 'axios'
function LandingPage(): ReactElement {
    // axios를 통한 server에 요청
    useEffect(() => {
        axios.get('/api/hello').then((response) => console.log(response))
    }, [])

    return (
        <h1>hello
            {console.log("check")}
        </h1>
    )
}

export default LandingPage
