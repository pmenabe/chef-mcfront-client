import _clone from 'lodash/cloneDeep'
import { 
  FETCH_MICROAPPBUNDLES_BEGIN,
  FETCH_MICROAPPBUNDLES_SUCCESS,
  FETCH_MICROAPPBUNDLES_FAILURE,
  DELETE_MICROAPPBUNDLES_SUCCESS,
  DELETE_MICROAPPBUNDLES_FAILURE,
  UPDATE_MICROAPPBUNDLES_STATUS } from '../constants'

export default function (state, action) {
  let error = state.error
  let loading = state.loading

  switch (action.type) {
    case FETCH_MICROAPPBUNDLES_BEGIN:
      error['micro-app-bundles'] = null
      loading['micro-app-bundles'] = true
      return {
        ...state,
        loading,
        error
      }
    case FETCH_MICROAPPBUNDLES_SUCCESS:
      error['micro-app-bundles'] = null
      loading['micro-app-bundles'] = false

      let microAppBundles = {}
      if (action.payload.microAppBundles) {
        microAppBundles = action.payload.microAppBundles
      }
      return {
        ...state,
        microAppBundles,
        loading,
        error
      }
    case FETCH_MICROAPPBUNDLES_FAILURE:
      error['micro-app-bundles'] = action.payload.error
      loading['micro-app-bundles'] = false
      return {
        ...state,
        microAppBundles: [],
        loading,
        error
      }

    case DELETE_MICROAPPBUNDLES_SUCCESS:
      error['micro-app-bundles'] = null
      loading['micro-app-bundles'] = false

      microAppBundles = state.microAppBundles
      if (action.payload.id) {
        microAppBundles = microAppBundles.filter((microAppBundle) => microAppBundle.id != action.payload.id)
      }
      return {
        ...state,
        microAppBundles,
        modal: {},
        loading,
        error
      }
    
    case DELETE_MICROAPPBUNDLES_FAILURE:
      error['micro-app-bundles'] = action.payload.error
      loading['micro-app-bundles'] = false
      return {
        ...state,
        modal: {},
        loading,
        error
      }

    case UPDATE_MICROAPPBUNDLES_STATUS:
      let newMicroAppBundles = state.microAppBundles
      if (action.payload.microAppBundle) {
        newMicroAppBundles = newMicroAppBundles.map((microAppBundle) => {
          if (action.payload.microAppBundle.id && (microAppBundle.id == action.payload.microAppBundle.id)) {
            microAppBundle.status = action.payload.microAppBundle.status
            microAppBundle.commit = action.payload.microAppBundle.commit
          }
          return microAppBundle
        })
      }
      return {
        ...state,
        microAppBundles: newMicroAppBundles
      }
    default:
      return state
  }
}