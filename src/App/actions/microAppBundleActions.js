'use strict'

import {
  FETCH_MICROAPPBUNDLES_BEGIN,
  FETCH_MICROAPPBUNDLES_SUCCESS,
  FETCH_MICROAPPBUNDLES_FAILURE,
  DELETE_MICROAPPBUNDLES_SUCCESS,
  DELETE_MICROAPPBUNDLES_FAILURE,
  UPDATE_MICROAPPBUNDLES_STATUS } from '../constants'
import api from '../api'
import { history } from '../helpers/history'

export const fetchMicroAppBundlesBegin = () => ({
  type: FETCH_MICROAPPBUNDLES_BEGIN
})

export const fetchMicroAppBundlesSuccess = (microAppBundles) => ({
  type: FETCH_MICROAPPBUNDLES_SUCCESS,
  payload: { microAppBundles }
})

export const fetchMicroAppBundlesFailure = (message) => ({
  type: FETCH_MICROAPPBUNDLES_FAILURE,
  payload: { message }
})

export const updateMicroAppBundleStatus = (microAppBundle) => ({
  type: UPDATE_MICROAPPBUNDLES_STATUS,
  payload: { microAppBundle }
})

export const deleteMicroAppBundleSuccess = (id) => ({
  type: DELETE_MICROAPPBUNDLES_SUCCESS,
  payload: { id }
})

export const deleteMicroAppBundleFailure = (message) => ({
  type: DELETE_MICROAPPBUNDLES_FAILURE,
  payload: { message }
})

export function fetchMicroAppBundles() {
  return dispatch => {
    dispatch(fetchMicroAppBundlesBegin())
    return api.getMicroAppBundles()
      .then(json => {
        dispatch(fetchMicroAppBundlesSuccess(json.data))
      })
      .catch(error => {
        dispatch(fetchMicroAppBundlesFailure({ message: error.message }))
      })
  }
}

export function buildMicroAppBundle(data) {
  return dispatch => {
    //dispatch(fetchDevelopersBegin())
    return api.buildMicroAppBundle(data)
      .then(json => {
        //dispatch(fetchDevelopersSuccess(json.data))
        history.goBack()
      })
      .catch(error => {
        //dispatch(fetchDevelopersFailure({ message: error.message }))
      })
  }
}

export function deleteMicroAppBundle(id) {
  return dispatch => {
    return api.deleteMicroAppBundle(id)
      .then(json => {
        dispatch(deleteMicroAppBundleSuccess(id))
      })
      .catch(error => {
        dispatch(deleteMicroAppBundleFailure({ message: error.message }))
      })
  }
}