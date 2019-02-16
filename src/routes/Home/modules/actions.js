import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const IS_GETING_USER = 'IS_GETING_USER'
export const FACEBOOK_INIT = 'facebook.init';
export const SHARE_FACEBOOK = 'facebook.share';
export const SHARE_FB_SUCCESS = 'SHARE_FB_SUCCESS'
export const isGettingUser = () => {
  return {
    type: IS_GETING_USER
  }
}
export const getUser = () => {
  return (dispatch, getState) => {
    dispatch(isGettingUser());
    request('api/user/get').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getUserSuccess(response));
      } else {
        dispatch(getUserError(response));
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
/**
 * Share Facebook
 */
export const shareFB = (url) => {
  let type = SHARE_FACEBOOK;
  return (dispatch) => {
    window.FB.ui({
      method: 'share',
      href: url,
      hashtag: '##ChơiTếtFreeFire',
      quote:"Tết này ăn quà FreeFire là đủ no rồi:3 Share trang nhận ngay quà FREE nào anh em!",
    }, async(response) => {
      if (response && !response['error_code']) {
        console.log('The user have shared facebook successful');
        request('api/pre_event/claim_share_reward', 'POST', {
          body: JSON.stringify({})
        })
        .then(function (response) {
          if (response.status == 'successful') {
            dispatch(shareFBSuccess(response));
            swal({
              title: '',
              animation: false,
              html: '<img src="images/share_success.png" alt="">',
              confirmButtonText: '',
              customClass: 'animated zoomIn share-modal'
            })
          }
          else{
            swal({
              title: 'Thông báo',
              html: '<p class="pop-content">'+showErrorWithCode(response.error_code)+'</p>',
              confirmButtonText: 'Đóng',
              customClass: 'custom-modal'
            })
          }
        })
        dispatch(shareFBSuccess(response));
      } else {
        console.log('The user has not share facebook');
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chia sẻ không thành công. Xin vui lòng thử lại.</p>',
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal'
        })
      }
    });
    dispatch(() => { type: SHARE_FACEBOOK })
  }
}
export const shareFBSuccess = (response) => {
  return {
    type: SHARE_FB_SUCCESS,
    payload: response.payload
  }
}
