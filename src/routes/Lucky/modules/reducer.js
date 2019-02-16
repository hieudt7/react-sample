import {
  SHOW_MODAL,
  GET_LUCKY_SUCCESS,
  GET_LUCKY_ERROR,
  IS_GET_LUCKY,
  SEND_LUCKY_SUCCESS,
  SEND_LUCKY_ERROR,
  IS_SEND_LUCKY,
  SHARE_LUCKY_SUCCESS,
  SHARE_LUCKY_ERROR,
  IS_SHARE_LUCKY,
  CLAIM_REWARD_SUCCESS,
  CLAIM_REWARD_ERROR,
  IS_CLAIM_REWARD,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_ERROR,
  IS_GET_HISTORY,
} from './actions'

const initialState = {
  isShowModal: null,
  isGetLucky: false,
  isSendLucky: false,
  isShareLucky: false,
  isClaim: false,
  isGetHistory: false,
  luckyInfo: {},
  urlShare: null,
  lucky_history: null,
}

export default function luckyReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload
      }
      break;
    case GET_LUCKY_SUCCESS:
      return {
        ...state,
        isGetLucky: false,
        luckyInfo: action.payload
      }
      break;
    case GET_LUCKY_ERROR:
      return {
        ...state,
        isGetLucky: false
      }
      break;
    case IS_GET_LUCKY:
      return {
        ...state,
        isGetLucky: true
      }
      break;
    case SEND_LUCKY_SUCCESS:
      return {
        ...state,
        isSendLucky: false,
        luckyInfo: {
          ...state.luckyInfo,
          lucky_successful_count: action.payload.payload.lucky_successful_count,
          lucky_in_day_count: action.payload.payload.lucky_in_day_count,
        }
      }
      break;
    case SEND_LUCKY_ERROR:
      return {
        ...state,
        isSendLucky: false
      }
      break;
    case IS_SEND_LUCKY:
      return {
        ...state,
        isSendLucky: true
      }
      break;
    case SHARE_LUCKY_SUCCESS:
      return {
        ...state,
        isShareLucky: false,
        //set lucky count
        urlShare: action.payload.uuid
      }
      break;
    case SHARE_LUCKY_ERROR:
      return {
        ...state,
        isShareLucky: false
      }
      break;
    case IS_SHARE_LUCKY:
      return {
        ...state,
        isShareLucky: true
      }
      break;
    case CLAIM_REWARD_SUCCESS:
      return {
        ...state,
        isClaim: false,
        luckyInfo: {
          ...state.luckyInfo,
          lucky_stage_rewards: action.payload.payload.lucky_stage_rewards,
        }
      }
      break;
    case CLAIM_REWARD_ERROR:
      return {
        ...state,
        isClaim: false
      }
      break;
    case IS_CLAIM_REWARD:
      return {
        ...state,
        isClaim: true
      }
      break;
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        isGetHistory: false,
        lucky_history: action.payload.lucky_history,
      }
      break;
    case GET_HISTORY_ERROR:
      return {
        ...state,
        isGetHistory: false
      }
      break;
    case IS_GET_HISTORY:
      return {
        ...state,
        isGetHistory: true
      }
      break;
    default:
      return state
  }
}
