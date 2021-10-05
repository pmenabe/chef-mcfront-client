'use strict'

import {
  FETCH_DEVELOPERS_BEGIN,
  FETCH_DEVELOPERS_SUCCESS,
  FETCH_DEVELOPERS_FAILURE } from '../constants'
import api from '../api'
import { history } from '../helpers/history'

export const fetchDevelopersBegin = () => ({
  type: FETCH_DEVELOPERS_BEGIN
})

export const fetchDevelopersSuccess = (developers) => ({
  type: FETCH_DEVELOPERS_SUCCESS,
  payload: { developers }
})

export const fetchDevelopersFailure = (message) => ({
  type: FETCH_DEVELOPERS_FAILURE,
  payload: { message }
})

export function fetchDevelopers() {
  return dispatch => {
    dispatch(fetchDevelopersBegin())
    return api.getUsers()
      .then(json => {
        dispatch(fetchDevelopersSuccess(json.data))
      })
      .catch(error => {
        dispatch(fetchDevelopersFailure({ message: error.message }))
      })
  }
}

export function saveDeveloper(data) {
  return dispatch => {
    //dispatch(fetchDevelopersBegin())
    return api.saveUser(data)
      .then(json => {
        //dispatch(fetchDevelopersSuccess(json.data))
        history.goBack()
      })
      .catch(error => {
        //dispatch(fetchDevelopersFailure({ message: error.message }))
      })
  }
}
