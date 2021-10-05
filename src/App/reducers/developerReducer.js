import { 
  FETCH_DEVELOPERS_BEGIN,
  FETCH_DEVELOPERS_SUCCESS,
  FETCH_DEVELOPERS_FAILURE } from '../constants'

export default function (state, action) {
  let error = state.error
  let loading = state.loading

  switch (action.type) {
    case FETCH_DEVELOPERS_BEGIN:
      error['developers'] = null
      loading['developers'] = true
      return {
        ...state,
        loading,
        error
      }
    case FETCH_DEVELOPERS_SUCCESS:
      error['developers'] = null
      loading['developers'] = false

      let developers = {}
      if (action.payload.developers) {
        developers = action.payload.developers
      }
      return {
        ...state,
        developers,
        loading,
        error
      }
    case FETCH_DEVELOPERS_FAILURE:
      error['developers'] = action.payload.error
      loading['developers'] = false
      return {
        ...state,
        developers: [],
        loading,
        error
      }

    default:
      return state
  }
}