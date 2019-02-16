import {
  CURRENT_USER_REQUEST_ERROR,
  CURRENT_USER_REQUEST_SUCCESS,
  CURRENT_USER_FETCHING,
} from './actions'

const initialState = {
  loading: false,
  login: false,
  userInfo:{},
  menuInfo:{}
}

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        userInfo: action.payload || [],
        menuInfo: action.payload,
        error: ''
      }
      break;
    case CURRENT_USER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        menuInfo: action.payload.payload,
      }
      break;
    case CURRENT_USER_FETCHING:
      return {
        ...state,
        loading: true
      }
      break;
    default:
      return state
  }
}
