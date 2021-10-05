'use strict'

import { OPEN_MODAL } from '../constants'

export const openModal = (title, message, action) => ({
  type: OPEN_MODAL,
  payload: { title, message, action }
})