import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, ...rest }) => {
    return  <Route {...rest} render={props => {
        if (localStorage.getItem('authToken') && (localStorage.getItem('authToken') != 'undefined')) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: '/login' }} />
        }
    }} />
}