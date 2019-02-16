import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  IS_GETING_USER,
  SHOW_MODAL,
  DRAW_ERROR,
  DRAW_SUCCESS,
  IS_DRAW,
  GET_TOP_ERROR,
  GET_TOP_SUCCESS,
  IS_GET_TOP,
  GET_CHEST_INFO_ERROR,
  GET_CHEST_INFO_SUCCESS,
  IS_GET_CHEST_INFO,
  CLAIM_REWARD_ERROR,
  CLAIM_REWARD_SUCCESS,
  IS_CLAIM_REWARD,
  BUY_CHEST_ERROR,
  BUY_CHEST_SUCCESS,
  IS_BUY_CHEST,
} from './actions'

const initialState = {
  isGettingUser: false,
  isDraw: false,
  isGetChest: false,
  userZodiacInfo: {},
  isLogin: false,
  isGetTop: false,
  isShowModal: null,
  drawItem: [],
  topUser: [],
  chestStatus: {},
  unique_list: null,
}

export default function zodiacReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        isGettingUser: false,
        isLogin: true,
        userZodiacInfo: action.payload || [],
      }
      break;
    case IS_GETING_USER:
      return {
        ...state,
        isGettingUser: true
      }
      break;
    case GET_USER_ERROR:
      return {
        ...state,
        isGettingUser: false,
      }
      break;
    case SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload
      }
      break;
    case DRAW_SUCCESS:
      return {
        ...state,
        isDraw: false,
        drawItem: action.payload.payload.item_drawn || [],
        userZodiacInfo: {
          ...state.userZodiacInfo,
          zodiac_count: action.payload.payload.zodiac_count,
          draw_balance: action.payload.payload.draw_balance,
          zodiac_draw_count: action.payload.payload.zodiac_draw_count,
          player_drawn_rewards: action.payload.payload.player_drawn_rewards,
        },
      }
      break;
    case IS_DRAW:
      return {
        ...state,
        isDraw: true
      }
      break;
    case DRAW_ERROR:
      return {
        ...state,
        isDraw: false,
      }
      break;
    case GET_TOP_SUCCESS:
      return {
        ...state,
        isGetTop: false,
        topUser: action.payload.payload,
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
    case GET_CHEST_INFO_SUCCESS:
      return {
        ...state,
        isGetChest: false,
        chestStatus: action.payload.payload,
      }
      break;
    case IS_GET_CHEST_INFO:
      return {
        ...state,
        isGetChest: true
      }
      break;
    case GET_CHEST_INFO_ERROR:
      return {
        ...state,
        isGetChest: false,
      }
      break;
    case CLAIM_REWARD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        isClaim: false,
        unique_list: action.payload.payload.unique_list,
        userZodiacInfo: {
          ...state.userZodiacInfo,
          stage_rewards: action.payload.payload.stage_rewards
        },
      }
      break;
    case IS_CLAIM_REWARD:
      return {
        ...state,
        isClaim: true,

      }
      break;
    case CLAIM_REWARD_ERROR:
      return {
        ...state,
        isClaim: false,
      }
      break;
    case BUY_CHEST_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        isBuy: false,
        userZodiacInfo: {
          ...state.userZodiacInfo,
          zodiac_count: action.payload.payload.zodiac_info.zodiac_count,
          player_drawn_rewards: action.payload.payload.zodiac_info.player_drawn_rewards,
        },
        chestStatus: {
          ...state.chestStatus,
          gems_balance: action.payload.payload.chest_info.gems_balance
        }
      }
      break;
    case IS_BUY_CHEST:
      return {
        ...state,
        isBuy: true
      }
      break;
    case BUY_CHEST_ERROR:
      return {
        ...state,
        isBuy: false,
      }
      break;
    default:
      return state
  }
}
