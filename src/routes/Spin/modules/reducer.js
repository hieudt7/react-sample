import {
  GET_WHEEL_SUCCESS,
  GET_WHEEL_ERROR,
  IS_GET_WHEEL,
  GET_TOP_SUCCESS,
  GET_TOP_ERROR,
  IS_GET_TOP,
  IS_GET_SPIN,
  GET_SPIN_SUCCESS,
  GET_SPIN_ERROR,
  SHOW_MODAL,
  UPDATE_INFO_SUCCESS
} from './actions'

const initialState = {
  isGetWheel: false,
  isGetTop: false,
  isGetSpin: false,
  wheelInfo: [],
  topInfo: null,
  spinItem: {},
  isShowModal: null,
  isUpdated: false,

}

export default function spinReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload
      }
      break;
    case GET_WHEEL_SUCCESS:
      return {
        ...state,
        isGetWheel: false,
        wheelInfo: action.payload,
      }
      break;
    case IS_GET_WHEEL:
      return {
        ...state,
        isGetWheel: true
      }
      break;
    case GET_WHEEL_ERROR:
      return {
        ...state,
        isGetWheel: false,
      }
      break;
    case GET_TOP_SUCCESS:
      return {
        ...state,
        isGetTop: false,
        topInfo: action.payload,
      }
      break;
    case IS_GET_TOP:
      return {
        ...state,
        isGetTop: true
      }
      break;
    case GET_TOP_ERROR:
      return {
        ...state,
        isGetTop: false,
      }
      break;
    case GET_SPIN_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        isGetSpin: false,
        spinItem: action.payload.data,
        wheelInfo: {
          ...state.wheelInfo,
          wheel_free_spin: action.payload.wheel_free_spin,
          wheel_paid_spin: action.payload.wheel_paid_spin,
          gems_balance: action.payload.gem_balance
        }
      }
      break;
    case IS_GET_SPIN:
      return {
        ...state,
        isGetSpin: true
      }
      break;
    case GET_SPIN_ERROR:
      return {
        ...state,
        isGetSpin: false,
      }
      break;
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      }
      break;
    default:
      return state
  }
}
