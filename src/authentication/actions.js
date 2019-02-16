import request from "lib/request"
import swal from "sweetalert2"

export const CURRENT_USER_REQUEST         = 'CURRENT_USER_REQUEST'
export const CURRENT_USER_REQUEST_ERROR   = 'CURRENT_USER_REQUEST_ERROR'
export const CURRENT_USER_REQUEST_SUCCESS = 'CURRENT_USER_REQUEST_SUCCESS'
export const CURRENT_USER_FETCHING        = 'CURRENT_USER_FETCHING'
export const isCurrentUserFetching = () => {
  return {
    type: CURRENT_USER_FETCHING
  }
}

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    dispatch(isCurrentUserFetching());
    request('api/user/get').then(function(response) {
      if(response.status == 'successful') {
        dispatch(getCurrentUserSuccess(response));
      } else {
        dispatch(getCurrentUserError(response))
      }
    })
  }
}

export const getCurrentUserSuccess = (response) => {
  return {
    type: CURRENT_USER_REQUEST_SUCCESS,
    payload: response.payload
  }
}

export const getCurrentUserError = (response) => {
  return {
    type: CURRENT_USER_REQUEST_ERROR,
    payload: response
  }
}
