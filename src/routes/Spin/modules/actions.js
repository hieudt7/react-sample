import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode,SPIN_CONFIG } from 'components/common'
export const GET_WHEEL_SUCCESS = 'GET_WHEEL_SUCCESS'
export const GET_WHEEL_ERROR = 'GET_WHEEL_ERROR'
export const IS_GET_WHEEL = 'IS_GET_WHEEL'
export const GET_TOP_SUCCESS = 'GET_TOP_SUCCESS'
export const GET_TOP_ERROR = 'GET_TOP_ERROR'
export const IS_GET_TOP = 'IS_GET_TOP'
export const IS_GET_SPIN = 'IS_GET_SPIN'
export const GET_SPIN_SUCCESS = 'GET_SPIN_SUCCESS'
export const GET_SPIN_ERROR = 'GET_SPIN_ERROR'
export const SHOW_MODAL = 'SHOW_MODAL'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_ERROR = 'UPDATE_INFO_ERROR'
export const IS_UPDATE_INFO = 'IS_UPDATE_INFO'
export const showModal = (mdType) => {
  return {
    type: SHOW_MODAL,
    payload: mdType
  }
}
//wheel info
export const isGettingWheel = () => {
  return {
    type: IS_GET_WHEEL
  }
}
export const getWheel = () => {
  return (dispatch, getState) => {
    dispatch(isGettingWheel());
    request('api/wheel/get').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getWheelSuccess(response));
      } else {
        dispatch(getWheelError(response))
      }
    })
  }
}
export const getWheelSuccess = (response) => {
  return {
    type: GET_WHEEL_SUCCESS,
    payload: response.payload
  }
}
export const getWheelError = (response) => {
  return {
    type: GET_WHEEL_ERROR,
    payload: response
  }
}
//wheel top
export const isGettingTop = () => {
  return {
    type: IS_GET_TOP
  }
}
export const getTop = (isShow) => {
  return (dispatch, getState) => {
    dispatch(isGettingTop());
    request('api/wheel/top').then(function (response) {
      dispatch(showModal('clear'))
      if (response.status == 'successful') {
        dispatch(getTopSuccess(response));
        if(isShow){
          dispatch(showModal('top'))
        }
      } else {
        dispatch(getTopError(response))
        dispatch(showModal('clear'))
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
export const getTopSuccess = (response) => {
  return {
    type: GET_TOP_SUCCESS,
    payload: response.payload
  }
}
export const getTopError = (response) => {
  return {
    type: GET_TOP_ERROR,
    payload: response
  }
}
//update info
export const isupdateInfo = () => {
  return {
    type: IS_UPDATE_INFO
  }
}
export const updateInfo = (real_name, address, phone_number) => {
  return (dispatch, getState) => {
    dispatch(isupdateInfo());
    request('api/wheel/update_info', 'POST', {
      body: JSON.stringify({
        real_name: real_name,
        address: address,
        phone_number: phone_number
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(showModal('err1'))
        dispatch(updateInfoSuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Cập nhật thông tin thành công.</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        dispatch(showModal('err1'))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        dispatch(updateInfoError(response.error_code))
      }
    })
  }
}
export const updateInfoSuccess = (response) => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: response
  }
}
export const updateInfoError = (error) => {
  return {
    type: UPDATE_INFO_ERROR,
    payload: error
  }
}
//wheel spin
export const isGettingSpin = () => {
  return {
    type: IS_GET_SPIN
  }
}
export const getSpin = (spin_type) => {
  return (dispatch, getState) => {
    dispatch(isGettingSpin());
    dispatch(showModal('err1'))
    request('api/wheel/spin', 'POST', {
      body: JSON.stringify({
        spin_type: spin_type
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        let position = (response.payload.data.item_order > 0) ? (13 - response.payload.data.item_order) : 0
        console.log(position)
        var $r = $('.whel-body').fortune({
          prices: SPIN_CONFIG,
          min_spins: 2, // The minimum number of spins
          max_spins: 5,
          separation: 6,
          duration: 7000
        }).spin(position).done(function (price) {
          dispatch(showModal('spin-gift'))
        });
        dispatch(getSpinSuccess(response))
      } else {
        dispatch(showModal('err1-spin'))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        dispatch(getSpinError(response.error_code))
      }
    })
  }
}
export const getSpinSuccess = (response) => {
  return {
    type: GET_SPIN_SUCCESS,
    payload: response.payload
  }
}
export const getSpinError = (response) => {
  return {
    type: GET_SPIN_ERROR,
    payload: response
  }
}