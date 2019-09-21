import React, { useEffect, useState } from 'react'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import store from 'store'

import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from "react-router-dom"

import ShowImages from './components/ShowImages'
import FavouriteImages from './components/FavoriteImages'
import DeleteImages from './components/DeleteImages'

const App: React.FC = () => {

  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [userName, setUserName] = useState('')

  const [username, setUsername]: any = useState('')
  const [password, setPassword]: any = useState('')

  let userPresent = false


  useEffect(() => {

    store.each(function (value, key: any) {
      if (value['isLoggedIn'] === true) {
        setIsLoggedIn(true)
        setUserName(key)
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

    store.each(function (value, key: any) {
      if (key === username) {
        userPresent = true
        return
      }
    })

    if (!userPresent)
      store.set(username, user)

    else {
      let oldUser = store.get(username)
      oldUser['isLoggedIn'] = true
      store.set(username, oldUser)
    }

    setIsLoggedIn(true)
    window.location.href = '/show_random_images'
  }


  const logout = (event: any) => {
    event.preventDefault()
    let user = store.get(userName)
    user['isLoggedIn'] = false
    store.set(userName, user)
    setIsLoggedIn(false)

    window.location.href = '/'
  }


  const login = () => {
    return (
      <div className="row">
        <div className="col-12">
          <form onSubmit={event => formSubmission(event)}>
            <br />
            User Name:
            <br />
            <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
            <br />
            Password:
            <br />
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
            <br />
            <br />
            <Button type="submit" className="btn btn-success">Login</Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <header className="App-header">
          <h3>Unsplash Images API based React App</h3>
        </header>

        <div className="row">

          <div className="col-6 mt-4">
            <Nav>
              <Nav.Item>
                {isLoggedIn ? <Nav.Link><Link to="/show_random_images">Unsplash Random Images</Link></Nav.Link> : ''}
              </Nav.Item>

              <Nav.Item>
                {isLoggedIn ? <Nav.Link><Link to="/view_favourite">Favourite Images</Link></Nav.Link> : ''}
              </Nav.Item>

              <Nav.Item>
                {isLoggedIn ? <Nav.Link><Link to="/delete_images">Delete Images</Link></Nav.Link> : ''}
              </Nav.Item>
            </Nav>

          </div>

          <div className={isLoggedIn ? 'col-6 mt-4' : 'col-12'}>
            {isLoggedIn ?
              <span>Welcome {userName} !
                &nbsp; &nbsp;
                <Button onClick={(event: any) => logout(event)} className="btn btn-danger">Logout</Button>
              </span>
              : <span>You are not logged in. Please Log In to view Images
            {login()}
              </span>
            }
          </div>

        </div>
        <hr />

        <div className="route">
          <Switch>
            <Route exact path="/" />
            <Route exact path="/show_random_images" component={ShowImages} />
            <Route exact path="/view_favourite" component={FavouriteImages} />
            <Route exact path="/delete_images" component={DeleteImages} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
