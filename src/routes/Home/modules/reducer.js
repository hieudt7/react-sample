import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  IS_GETING_USER,
  SHARE_FB_SUCCESS
} from './actions'

const initialState = {
  isGettingUser: false,
  login: false,
  userInfo: {},
  menuInfo:{},
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        isGettingUser: false,
        login: true,
        userInfo: action.payload,
        menuInfo: action.payload,
      }
      break;
    case IS_GETING_USER:
      return {
        ...state,
        isGettingUser: true
      }
      break;
    case GET_USER_ERROR:
    console.log(action.payload)
      return {
        ...state,
        menuInfo: action.payload.payload,
        isGettingUser: false,
      }
      break;
    default:
      return state
  }
}
