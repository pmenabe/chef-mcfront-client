import { 
  FETCH_MICROAPPS_BEGIN,
  FETCH_MICROAPPS_SUCCESS,
  FETCH_MICROAPPS_FAILURE,
  DELETE_MICROAPPS_SUCCESS,
  DELETE_MICROAPPS_FAILURE } from '../constants'

export default function (state, action) {
  let error = state.error
  let loading = state.loading

  switch (action.type) {
    case FETCH_MICROAPPS_BEGIN:
      error['micro-apps'] = null
      loading['micro-apps'] = true
      return {
        ...state,
        loading,
        error
      }
    case FETCH_MICROAPPS_SUCCESS:
      error['micro-apps'] = null
      loading['micro-apps'] = false

      let microApps = {}
      if (action.payload.microApps) {
        microApps = action.payload.microApps
      }
      return {
        ...state,
        microApps,
        loading,
        error
      }
    case FETCH_MICROAPPS_FAILURE:
      error['micro-apps'] = action.payload.error
      loading['micro-apps'] = false
      return {
        ...state,
        microApps: [],
        loading,
        error
      }

    case DELETE_MICROAPPS_SUCCESS:
      error['micro-apps'] = null
      loading['micro-apps'] = false

      microApps = state.microApps
      if (action.payload.id) {
        microApps = microApps.filter((microApp) => microApp.id != action.payload.id)
      }
      return {
        ...state,
        microApps,
        modal: {},
        loading,
        error
      }
    
    case DELETE_MICROAPPS_FAILURE:
      error['micro-apps'] = action.payload.error
      loading['micro-apps'] = false
      return {
        ...state,
        modal: {},
        loading,
        error
      }
    
    default:
      return state
  }
}