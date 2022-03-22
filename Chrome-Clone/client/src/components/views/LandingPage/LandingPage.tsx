import React, { ReactElement, useEffect } from 'react'
import axios from 'axios'
function LandingPage(): ReactElement {
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
