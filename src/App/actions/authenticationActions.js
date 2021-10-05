'use strict'

import {
    USERS_LOGIN_REQUEST, 
    USERS_LOGIN_SUCCESS, 
    USERS_LOGIN_FAILURE } from '../constants'
import api from '../api'
import { history } from '../helpers/history'

export const loginRequest = (user) => ({
    type: USERS_LOGIN_REQUEST
})

export const loginSuccess = (user) => ({
    type: USERS_LOGIN_SUCCESS,
    payload: { user }
})

export const loginFailure = (error) => ({
    type: USERS_LOGIN_FAILURE,
    payload: { error }
})

export function login(email, pass) {
  return dispatch => {
    dispatch(loginRequest())
    return api.login({ email, pass })
      .then(user => {
        let token = user.data.token
        localStorage.setItem('authToken', JSON.stringify(token))
        dispatch(loginSuccess(user.data))
        history.push('/')
      })
      .catch(error => {
        dispatch(loginFailure(error))
      })
  }
}

export function loadUser() {
  return dispatch => {
    return api.loadUser()
      .then(user => {
        dispatch(loginSuccess(user.data))
      })
      .catch(error => {
      })
  }
}
export function logout() {
  return dispatch => {
    return api.logout()
      .then(() => {
        localStorage.removeItem('authToken')
        history.push('/login')
      })
      .catch(error => {
        console.warn('logout()', error)
      })
  }
}