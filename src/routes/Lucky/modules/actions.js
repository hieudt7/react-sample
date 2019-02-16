import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode, SPIN_CONFIG } from 'components/common'
export const GET_LUCKY_SUCCESS = 'GET_LUCKY_SUCCESS'
export const GET_LUCKY_ERROR = 'GET_LUCKY_ERROR'
export const IS_GET_LUCKY = 'IS_GET_LUCKY'
export const SHOW_MODAL = 'SHOW_MODAL'
export const SEND_LUCKY_SUCCESS = 'SEND_LUCKY_SUCCESS'
export const SEND_LUCKY_ERROR = 'SEND_LUCKY_ERROR'
export const IS_SEND_LUCKY = 'IS_SEND_LUCKY'
export const SHARE_LUCKY_SUCCESS = 'SHARE_LUCKY_SUCCESS'
export const SHARE_LUCKY_ERROR = 'SHARE_LUCKY_ERROR'
export const IS_SHARE_LUCKY = 'IS_SHARE_LUCKY'
export const CLAIM_REWARD_ERROR = 'CLAIM_REWARD_ERROR'
export const CLAIM_REWARD_SUCCESS = 'CLAIM_REWARD_SUCCESS'
export const IS_CLAIM_REWARD = 'IS_CLAIM_REWARD'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_ERROR = 'GET_HISTORY_ERROR'
export const IS_GET_HISTORY = 'IS_GET_HISTORY'
export const CLAIM_SHARE_SUCCESS = 'IS_CLAIM_SHARE_SUCCESS'
export const CLAIM_SHARE_ERROR = 'IS_CLAIM_SHARE_ERROR'
export const IS_CLAIM_SHARE = 'IS_IS_CLAIM_SHARE'
export const showModal = (mdType) => {
  return {
    type: SHOW_MODAL,
    payload: mdType
  }
}
//lucky info
export const isgetLucky = () => {
  return {
    type: IS_GET_LUCKY
  }
}
export const getLucky = () => {
  return (dispatch, getState) => {
    dispatch(isgetLucky());
    request('api/lucky/get').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getLuckySuccess(response));
      } else {
        dispatch(getLuckyError(response))
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
export const getLuckySuccess = (response) => {
  return {
    type: GET_LUCKY_SUCCESS,
    payload: response.payload
  }
}
export const getLuckyError = (response) => {
  return {
    type: GET_LUCKY_ERROR,
    payload: response
  }
}
//send
export const issendLucky = () => {
  return {
    type: IS_SEND_LUCKY
  }
}
export const sendLucky = (account_id) => {
  return (dispatch, getState) => {
    dispatch(issendLucky());
    dispatch(showModal('clear'))
    request('api/lucky/send', 'POST', {
      body: JSON.stringify({
        account_id: account_id
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(sendLuckySuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Lì xì thành công. Quà sẽ được gửi vào mail trong game của người nhận</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        dispatch(sendLuckyError(response.error_code))
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
export const sendLuckySuccess = (response) => {
  return {
    type: SEND_LUCKY_SUCCESS,
    payload: response
  }
}
export const sendLuckyError = (error) => {
  return {
    type: SEND_LUCKY_ERROR,
    payload: error
  }
}
//share
export const isshareLucky = () => {
  return {
    type: IS_SHARE_LUCKY
  }
}
export const shareLucky = () => {
  return (dispatch, getState) => {
    dispatch(isshareLucky());
    dispatch(showModal('clear'))
    request('api/lucky/generate', 'POST', {
      body: JSON.stringify({})
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(shareLuckySuccess(response))
        window.location.href = 'https://www.facebook.com/dialog/share?app_id=349255008882543&display=touch&href=https://tet.ff.garena.vn/li-xi?shareid=' + response.payload.uuid + '&redirect_uri=https://tet.ff.garena.vn/li-xi?shareDone=1&quote='+encodeURI('Nhận lì xì FreeFire tại đây: https://tet.ff.garena.vn/li-xi?shareid=' + response.payload.uuid)+'&hashtag=%23ChơiTếtFreeFire';
      } else {
        dispatch(shareLuckyError(response.error_code))
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
export const shareLuckySuccess = (response) => {
  return {
    type: SHARE_LUCKY_SUCCESS,
    payload: response
  }
}
export const shareLuckyError = (error) => {
  return {
    type: SHARE_LUCKY_ERROR,
    payload: error
  }
}
//claim item
export const isClaimReward = () => {
  return {
    type: IS_CLAIM_REWARD
  }
}
export const claimReward = (stage) => {
  return (dispatch, getState) => {
    dispatch(isClaimReward());
    dispatch(showModal('clear'))
    request('api/lucky/claim_stage_reward', 'POST', {
      body: JSON.stringify({
        stage: stage
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(claimRewardSuccess(response))
        swal({
          title: '',
          html: ' <div class="exchange-result"><h4 class="gift-name">Chúc mừng bạn đã gửi thành công ' + stage + ' lì xì </h4><p class="des-gift">Quà sẽ được gửi vào mail trong game</p></div>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        dispatch(claimRewardError(response.error_code))
        if(response.error_code=='account_id_already_received'){
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">Bạn đã nhận lì xì từ người bạn này. Rất tiếc bạn chỉ có thể nhận lì xì từ 1 người bạn 1 lần/ngày</p>',
            confirmButtonText: 'Đóng',
            animation: false,
            customClass: 'custom-modal animated zoomIn'
          })
        }
        else{
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
            confirmButtonText: 'Đóng',
            animation: false,
            customClass: 'custom-modal animated zoomIn'
          })
        }
      
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
//history
export const isGetHistory = () => {
  return {
    type: IS_GET_HISTORY
  }
}
export const getHistory = () => {
  return (dispatch, getState) => {
    dispatch(isGetHistory());
    dispatch(showModal('clear-modal'))
    request('api/lucky/history').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getHistorySuccess(response));
        dispatch(showModal('lucky-history'))
      } else {
        dispatch(getHistoryError(response))
        dispatch(showModal('clear-modal'))
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
export const getHistorySuccess = (response) => {
  return {
    type: GET_HISTORY_SUCCESS,
    payload: response.payload
  }
}
export const getHistoryError = (response) => {
  return {
    type: GET_HISTORY_ERROR,
    payload: response
  }
}
//share
export const isClaimShareLucky = () => {
  return {
    type: IS_CLAIM_SHARE
  }
}
export const ClaimShareLucky = (uuid) => {
  return (dispatch, getState) => {
    dispatch(isClaimShareLucky());
    dispatch(showModal('clear'))
    request('api/lucky/claim', 'POST', {
      body: JSON.stringify({
        uuid:uuid
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(ClaimShareLuckySuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chúc mừng bạn đã nhận được lì xì từ '+response.payload.sender_nickname+'. Lì xì sẽ được gửi vào mail trong game</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        
      } else {
        dispatch(ClaimShareLuckyError(response.error_code))
        if(response.error_code=='account_id_already_received'){
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">Bạn đã nhận lì xì từ người bạn này. Rất tiếc bạn chỉ có thể nhận lì xì từ 1 người bạn 1 lần/ngày</p>',
            confirmButtonText: 'Đóng',
            animation: false,
            customClass: 'custom-modal animated zoomIn'
          })
        }
        else{
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
            confirmButtonText: 'Đóng',
            animation: false,
            customClass: 'custom-modal animated zoomIn'
          })
        }
      }
    })
  }
}
export const ClaimShareLuckySuccess = (response) => {
  return {
    type: CLAIM_SHARE_SUCCESS,
    payload: response
  }
}
export const ClaimShareLuckyError = (error) => {
  return {
    type: CLAIM_SHARE_ERROR,
    payload: error
  }
}