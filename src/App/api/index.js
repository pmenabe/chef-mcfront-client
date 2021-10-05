import { API_URL } from '../constants'
import fetch from './_fetch'
const url = API_URL

// Authentication
export const login = (credentials) => fetch.post(`${url}/login`, credentials)
export const logout = () => fetch.get(`${url}/logout`)

// MicroApps
export const getMicroApps = () => fetch.get(`${url}/micro-apps`)
export const getMicroApp = (id) => fetch.get(`${url}/micro-apps/${id}`)
export const getMicroAppBranchs = (id) => fetch.get(`${url}/micro-apps/${id}/branchs`)
export const deleteMicroApp = (id) => fetch.del(`${url}/micro-apps/${id}`)
export const saveMicroApp = (data) => fetch.post(`${url}/micro-apps`, data)
export const getNodeVersions = () => fetch.get(`${url}/node-versions`)
export const getProviders = () => fetch.get(`${url}/providers`)

// MicroAppBundles
export const getMicroAppBundles = () => fetch.get(`${url}/micro-app-bundles`)
export const buildMicroAppBundle = (data) => fetch.post(`${url}/micro-app-bundles`, data)
export const deleteMicroAppBundle = (id) => fetch.del(`${url}/micro-app-bundles/${id}`)

// Users
export const getUsers = () => fetch.get(`${url}/users`)
export const loadUser = () => fetch.get(`${url}/my-user`)
export const saveUser = (data) => fetch.post(`${url}/users`, data)

export default {
  // Authentication
  login,
  logout,

  // MicroApps
  getMicroApps,
  getMicroApp,
  getMicroAppBranchs,
  deleteMicroApp,
  saveMicroApp,
  getNodeVersions,
  getProviders,

  // MicroAppBundles
  getMicroAppBundles,
  buildMicroAppBundle,
  deleteMicroAppBundle,
  
  // Users
  getUsers,
  loadUser,
  saveUser
}