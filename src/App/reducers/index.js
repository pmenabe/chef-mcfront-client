
import authenticationReducer from './authenticationReducer'
import developerReducer from './developerReducer'
import microAppReducer from './microAppReducer'
import microAppBundleReducer from './microAppBundleReducer'
import modalReducer from './modalReducer'
import {
  AUTH_ACTIONS,
  DEVELOPER_ACTIONS,
  MICROAPP_ACTIONS,
  MICROAPPBUNDLE_ACTIONS,
  MODAL_ACTIONS } from '../constants'
 
const initialState = {
  developers: [],
  microApps: [],
  microAppBundles: [],
  user: {},
  loading: {},
  error: {},
  modal: {}
}

function rootReducer(state = initialState, action) {
  
  if (AUTH_ACTIONS[action.type]) return authenticationReducer(...arguments)
  if (DEVELOPER_ACTIONS[action.type]) return developerReducer(...arguments)
  if (MICROAPP_ACTIONS[action.type]) return microAppReducer(...arguments)
  if (MICROAPPBUNDLE_ACTIONS[action.type]) return microAppBundleReducer(...arguments)
  if (MODAL_ACTIONS[action.type]) return modalReducer(...arguments)
  
  return state || initialState
}

export default rootReducer