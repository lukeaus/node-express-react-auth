import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_SECRET_MESSAGE } from './types';

const API_ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // the function is how we get direct access to the dispatch method of 'store'
  // it is a powerful function that when we throw an action into it will
  // get forwarded onto all reducers

  // So we can place all our logic inside of the function

  // So all redux-thunk does is allowing us to return a function and
  // and it's going to recall that function with the dispatch method
  return function(dispatch) {
    // now we can make async calls!

    // submit email/password to server
    axios.post(`${API_ROOT_URL}/signin`, { email, password })
      .then(resp => {
        // If requrest if good...

        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - save JWT token. JWT only needed for Axios requests.
        localStorage.setItem('token', resp.data.token);

        // - redirect user to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - show an error to user
        dispatch(authError('Incorrect login details'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_ROOT_URL}/signup`, { email, password })
      .then(resp => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', resp.data.token);
        browserHistory.push('/feature');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

/**
 * Hit an API endpoint that requires authorisation
 */
export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${API_ROOT_URL}/secret`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(resp => {
        dispatch({ type: FETCH_SECRET_MESSAGE, data: resp.data.message });
      });
  };
}

/**
 * Same thing as above with redux-promise
 */
// export function fetchMessage() {
//   const request = axios.get(`${API_ROOT_URL}/secret`, {
//     headers: { authorization: localStorage.getItem('token') }
//   })
//   return {
//     FETCH_MESSAGE,
//     payload: request
//   }
// }
