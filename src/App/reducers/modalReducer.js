import { 
  OPEN_MODAL } from '../constants'

export default function (state, action) {
  let modal = state.modal

  switch (action.type) {
    case OPEN_MODAL:
      modal = action.payload
      modal.open = true
      return {
        ...state,
        modal
      }

    default:
      return state
  }
}