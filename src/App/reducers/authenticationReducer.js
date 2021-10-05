import { 
  USERS_LOGIN_REQUEST, 
  USERS_LOGIN_SUCCESS,
  USERS_LOGIN_FAILURE } from '../constants'

export default function (state, action) {
  let error = state.error
  let loading = state.loading

  switch (action.type) {
    case USERS_LOGIN_REQUEST:
      error['login'] = null
      loading['login'] = true
      return {
        ...state,
        loading,
        error
      }
    case USERS_LOGIN_SUCCESS:
      error['login'] = null
      loading['login'] = false

      let user = {}
      if (action.payload.user) {
        user = action.payload.user
      }
      return {
        ...state,
        loading,
        user,
        error
      }
    case USERS_LOGIN_FAILURE:
      error['login'] = action.payload.error
      loading['login'] = false
      return {
        ...state,
        loading,
        error
      }

    default:
      return state
  }
}