import React, { useState, useEffect } from 'react'
import store from 'store'
import { Redirect } from 'react-router'

const Login: React.FC = () => {

    const [username, setUsername]: any = useState('')
    const [password, setPassword]: any = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        store.each(function (value, key: any) {
            if (value['isLoggedIn'] === true) {
                setIsLoggedIn(true)
                return
            }
        })
    }, [isLoggedIn])

    const formSubmission = (event: any) => {
        
        event.preventDefault()

        if (username === '' || password === '') {
            alert('Please Enter a valid username / password')
            return
        }

        let user = {
            username: username,
            password: password,
            isLoggedIn: true
        }

        store.set(username, user)
        setIsLoggedIn(true)
    }


    return (
        <div>
            {isLoggedIn ? <Redirect to="/" /> :
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={event => formSubmission(event)}>
                            User Name:
                            <br />
                            <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                            <br />
                            Password:
                            <br />
                            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                            <br />
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;
