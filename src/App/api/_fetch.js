import { history } from '../helpers/history'

/**
 * GET method with authencation.
 * 
 * @param {String} url 
 */
function get(url) {
  return fetch(url, { 
      method: 'GET',
      headers: authHeader()
    })
    .then(handleErrors)
    .then(res => res.json())
}

/**
 * POST method with authencation.
 *  
 * @param {String} url 
 * @param {Object} item 
 */
function post(url, data) {
  return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...authHeader(), 
        'Content-Type': 'application/json'
      }
    })
    .then(handleErrors)
    .then(res => res.json())
}

/**
 * PUT method with authencation.
 *  
 * @param {String} url 
 * @param {Object} item 
 */
function put(url, item) {
  return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        ...authHeader(), 
        'Content-Type': 'application/json'
      }
    })
    .then(handleErrors)
    .then(res => res.json())
}

/**
 * DELETE method with authencation.
 *  
 * @param {String} url 
 */
function del(url) {
  return fetch(url, {
      method: 'DELETE',
      headers: authHeader() 
    })
    .then(handleErrors)
    .then(res => res.json())
}

/**
 * Handle errors of a request.
 *  
 * @param {*} response 
 */
function handleErrors(response) {
  if (!response.ok) {
    return response.json()
      .catch(() => {
        if (response.status == 401) {
          localStorage.removeItem('authToken')
          history.push('/login')
        }
        throw { message: response.statusText, code: response.status, ok: response.ok }
      })
      .then((error) => {
        console.log('handleErrors() controlled error', error)
        throw error   
      })
  }
  return response
}

function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem('authToken'))
  let header = {
    'Access-Control-Allow-Credentials': 'true'
  }
  if (token && (token != 'undefined')) {
    header['Authorization'] = `Bearer ${token}` 
  }   
  return header
}

export {
  get,
  post,
  put,
  del
}

export default {
  get,
  post,
  put,
  del
}