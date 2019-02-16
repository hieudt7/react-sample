import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const IS_GETING_USER = 'IS_GETING_USER'
export const DRAW_ERROR = 'DRAW_ERROR'
export const DRAW_SUCCESS = 'DRAW_SUCCESS'
export const IS_DRAW = 'IS_DRAW'
export const GET_TOP_ERROR = 'GET_TOP_ERROR'
export const GET_TOP_SUCCESS = 'GET_TOP_SUCCESS'
export const IS_GET_TOP = 'IS_GET_TOP'
export const SHOW_MODAL = 'SHOW_MODAL'
export const GET_CHEST_INFO_ERROR = 'GET_CHEST_INFO_ERROR'
export const GET_CHEST_INFO_SUCCESS = 'GET_CHEST_INFO_SUCCESS'
export const IS_GET_CHEST_INFO = 'IS_GET_CHEST_INFO'
export const BUY_CHEST_ERROR = 'BUY_CHEST_ERROR'
export const BUY_CHEST_SUCCESS = 'BUY_CHEST_SUCCESS'
export const IS_BUY_CHEST = 'IS_BUY_CHEST'
export const CLAIM_REWARD_ERROR = 'CLAIM_REWARD_ERROR'
export const CLAIM_REWARD_SUCCESS = 'CLAIM_REWARD_SUCCESS'
export const IS_CLAIM_REWARD = 'IS_CLAIM_REWARD'
export const isGettingUser = () => {
  return {
    type: IS_GETING_USER
  }
}
export const getUserZodiac = () => {
  return (dispatch, getState) => {
    dispatch(isGettingUser());
    dispatch(showModal('clear'))
    request('api/zodiac/get').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getUserSuccess(response));
        if (response.payload.zodiac_pig) {
          dispatch(showModal('pig-card'))
        }
      } else {
        dispatch(getUserError(response))
      }
    })
  }
}
export const getUserSuccess = (response) => {
  return {
    type: GET_USER_SUCCESS,
    payload: response.payload
  }
}
export const getUserError = (response) => {
  return {
    type: GET_USER_ERROR,
    payload: response
  }
}

//draw zodiac
export const isDrawZodiac = () => {
  return {
    type: IS_DRAW
  }
}
export const DrawZodiac = (draw_time) => {
  return (dispatch, getState) => {
    dispatch(isDrawZodiac());
    dispatch(showModal('clear'))
    request('api/zodiac/draw', 'POST', {
      body: JSON.stringify({
        draw_time
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(DrawZodiacSuccess(response))
        dispatch(showModal('exchange'))
      } else {
        dispatch(DrawZodiacError(response.error_code))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const DrawZodiacSuccess = (response) => {
  return {
    type: DRAW_SUCCESS,
    payload: response
  }
}
export const DrawZodiacError = (error) => {
  return {
    type: DRAW_ERROR,
    payload: error
  }
}
export const showModal = (mdType) => {
  return {
    type: SHOW_MODAL,
    payload: mdType
  }
}
//top-user
export const isGetTop = () => {
  return {
    type: IS_GET_TOP
  }
}
export const getTop = () => {
  return (dispatch, getState) => {
    dispatch(isGetTop());
    dispatch(showModal('clear'))
    request('api/zodiac/top').then(function (response) {
      console.log(response)
      if (response.status == 'successful') {
        dispatch(getTopSuccess(response))
        dispatch(showModal('top'))
      } else {
        dispatch(getTopError(response.error_code))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const getTopSuccess = (response) => {
  return {
    type: GET_TOP_SUCCESS,
    payload: response
  }
}
export const getTopError = (error) => {
  return {
    type: GET_TOP_ERROR,
    payload: error
  }
}
//chest info
export const isGetChestInfo = () => {
  return {
    type: IS_GET_CHEST_INFO
  }
}
export const getChestInfo = () => {
  return (dispatch, getState) => {
    dispatch(isGetTop());
    dispatch(showModal('clear'))
    request('api/zodiac/get_chest').then(function (response) {
      console.log(response)
      if (response.status == 'successful') {
        dispatch(getChestInfoSuccess(response))
        dispatch(showModal('chest'))
      } else {
        dispatch(getChestInfoError(response.error_code))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const getChestInfoSuccess = (response) => {
  return {
    type: GET_CHEST_INFO_SUCCESS,
    payload: response
  }
}
export const getChestInfoError = (error) => {
  return {
    type: GET_CHEST_INFO_ERROR,
    payload: error
  }
}
//buy chest
export const isBuyChest = () => {
  return {
    type: IS_BUY_CHEST
  }
}
export const buyChest = (price) => {
  return (dispatch, getState) => {
    dispatch(isBuyChest());
    dispatch(showModal('clear'))
    request('api/zodiac/purchase_chest', 'POST', {
      body: JSON.stringify({
        price: price
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(buyChestSuccess(response))
        console.log(response.payload)
        let message = ''
        if (response.payload.item_data.item_type == 'item') {
          message = 'Chúc mừng bạn nhận được ' + response.payload.item_data.item_name + '. Vật phẩm sẽ được gửi vào mail trong game trong thời gian sớm nhất.'
        }
        else if (response.payload.item_data.item_type == 'zodiac') {
          // if (response.payload.item_data.new) {
          //   message = 'Chúc mừng bạn đã nhận được thẻ ' + response.payload.item_data.item_name
          // }
          // else {
          //   message = 'Chúc mừng bạn đã nhận được thẻ ' + response.payload.item_data.item_name + '. Tặng bạn ' + response.payload.item_data.coins + ' vàng.'
          // }
          message = 'Chúc mừng bạn đã nhận được thẻ ' + response.payload.item_data.item_name
        }
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + message + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        dispatch(buyChestError(response.error_code))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const buyChestSuccess = (response) => {
  return {
    type: BUY_CHEST_SUCCESS,
    payload: response
  }
}
export const buyChestError = (error) => {
  return {
    type: BUY_CHEST_ERROR,
    payload: error
  }
}
//claim item
export const isClaimReward = () => {
  return {
    type: IS_CLAIM_REWARD
  }
}
export const claimReward = (type, stage) => {
  return (dispatch, getState) => {
    dispatch(isClaimReward());
    dispatch(showModal('clear'))
    request('api/zodiac/claim_stage_reward', 'POST', {
      body: JSON.stringify({
        type: type,
        stage: stage
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(claimRewardSuccess(response))
        console.log(response)
        let messageClaim = "";
        if (type == 'draw') {
          messageClaim = 'Chúc mừng bạn đã thu thập đủ ' + stage + ' huy hiệu. Vui lòng chờ quà sẽ được gửi vào mail trong game'
        }
        else {
          if (stage == 12) {
            messageClaim = 'Quà sẽ được trao sau khi sự kiện kết thúc'
          }
          else {
            messageClaim = 'Chúc mừng bạn đã thu thập đủ ' + stage + ' thẻ. Vui lòng chờ quà sẽ được gửi vào mail trong game'
          }
        }
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + messageClaim + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        dispatch(claimRewardError(response.error_code))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const claimRewardSuccess = (response) => {
  return {
    type: CLAIM_REWARD_SUCCESS,
    payload: response
  }
}
export const claimRewardError = (error) => {
  return {
    type: CLAIM_REWARD_ERROR,
    payload: error
  }
}