'use strict'

import {
  FETCH_MICROAPPS_BEGIN,
  FETCH_MICROAPPS_SUCCESS,
  FETCH_MICROAPPS_FAILURE,
  DELETE_MICROAPPS_SUCCESS,
  DELETE_MICROAPPS_FAILURE } from '../constants'
import api from '../api'
import { history } from '../helpers/history'

export const fetchMicroAppsBegin = () => ({
  type: FETCH_MICROAPPS_BEGIN
})

export const fetchMicroAppsSuccess = (microApps) => ({
  type: FETCH_MICROAPPS_SUCCESS,
  payload: { microApps }
})

export const fetchMicroAppsFailure = (message) => ({
  type: FETCH_MICROAPPS_FAILURE,
  payload: { message }
})

export const deleteMicroAppsSuccess = (id) => ({
  type: DELETE_MICROAPPS_SUCCESS,
  payload: { id }
})

export const deleteMicroAppsFailure = (message) => ({
  type: DELETE_MICROAPPS_FAILURE,
  payload: { message }
})

export function fetchMicroApps() {
  return dispatch => {
    dispatch(fetchMicroAppsBegin())
    return api.getMicroApps()
      .then(json => {
        dispatch(fetchMicroAppsSuccess(json.data))
      })
      .catch(error => {
        dispatch(fetchMicroAppsFailure({ message: error.message }))
      })
  }
}

export function saveMicroApp(data) {
  return dispatch => {
    //dispatch(fetchDevelopersBegin())
    return api.saveMicroApp(data)
      .then(json => {
        //dispatch(fetchDevelopersSuccess(json.data))
        history.goBack()
      })
      .catch(error => {
        //dispatch(fetchDevelopersFailure({ message: error.message }))
      })
  }
}

export function deleteMicroApp(id) {
  return dispatch => {
    return api.deleteMicroApp(id)
      .then(json => {
        dispatch(deleteMicroAppsSuccess(id, message))
      })
      .catch(error => {
        dispatch(deleteMicroAppsFailure({ message: error.message }))
      })
  }
}