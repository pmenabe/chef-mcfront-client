'use strict'

import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './helpers/history'

import Login from './pages/login'
import Secure from './pages/secure'
import Main from './pages/main'
/*
import Notification from './Notification'
*/
export default function App(props) {

  return (
    <Router history={history} >
      <Switch>
          <Route path="/login" component={ Login } />
          <Secure path="/" name="Inicio" component={Main} />
      </Switch>
    </Router>
  )
}