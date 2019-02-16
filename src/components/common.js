export function showErrorWithCode(errCode) {
  console.log(errorMess)
  let errorMess
  switch (errCode) {
    case 'not_logged_in':
      errorMess = 'Bạn chưa đăng nhập'
      break;
    case 'no_account':
      errorMess = 'Bạn chưa có tài khoản FO4, vui lòng tạo tài khoản FO4'
      break;
    case 'server_error':
      errorMess = 'Thao tác không thực hiện được, xin vui lòng thử lại sau'
      break;
    case 'api_error':
      errorMess = 'Thao tác không thực hiện được, xin vui lòng thử lại sau'
      break;
    case 'event_ended':
      errorMess = 'Sự kiện đã kết thúc'
      break;
    case 'pre_event_already_share':
      errorMess = 'Bạn đã chia sẻ nội dung này. Quà chia sẻ trang sự kiện chỉ được nhận 1 lần.'
      break;
    case 'token_error':
      errorMess = 'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại'
      break;
    case 'update_info_required':
      errorMess = 'Vui lòng cập nhật thông tin'
      break;
    case 're_login_require':
      errorMess = 'Vui lòng đăng nhập lại'
      break;
    case 'invalid_action':
      errorMess = 'Thao tác không thực hiện được'
      break;
    case 'invalid_region':
      errorMess = 'Region không hợp lệ nhé'
      break;
    case 'invalid_stage':
      errorMess = 'Bạn chưa đạt điều kiện nhận mốc quà'
      break;
    case 'not_enough_gems':
      errorMess = 'Không đủ kim cương.'
      break;
    case 'user_processing':
      errorMess = 'Đang xử lý...'
      break;
    case 'not_enough_draw':
      errorMess = 'Bạn chưa có huy hiệu Tết để Đổi Thẻ'
      break;
    case 'already_claim_stage':
      errorMess = 'Bạn đã nhận quà này rồi'
      break;
    case 'missing_account_id':
      errorMess = 'Bạn vui lòng tạo tài khoản Garena Free Fire để tham gia sự kiện. Tải app tại: https://ff.garena.vn/'
      break;
    case 'chest_time_invalid':
      errorMess = 'Bạn có thể mua hòm từ ngày 02/02'
      break;
    case 'time_invalid':
      errorMess = 'Sự kiện đã kết thúc'
      break;
    case 'account_id_invalid':
      errorMess = 'ID người nhận không hợp lệ. Vui lòng kiểm tra lại'
      break;
    case 'account_id_same_as_sender':
      errorMess = 'Bạn không thể gửi lì xì cho chính mình.'
      break;
    case 'account_id_already_received':
      errorMess = ' Bạn chỉ được lì xì cho một ID 1 lần/ngày. Vui lòng gửi lì xì cho người bạn khác.'
      break;
    case 'uuid_invalid':
      errorMess = 'Rất tiếc lì xì này đã có người nhận. Mỗi link chia sẻ tương ứng với 1 lì xì dành cho người nhận đầu tiên'
      break;
    case 'user_send_lucky_limit_exceeded':
      errorMess = 'Quá giới hạn gửi lì xì.'
      break;
    case 'user_receive_lucky_limit_exceeded':
      errorMess = 'Quá giới hạn nhận lì xì'
      break;
    default:
      errorMess = errCode;
      break;
  }
  return errorMess
}
export const CHEST_INFO = [
  { 'id': 'chest_count_10', 'name': '10', 'avtar': 'images/chest_1.png', 'limited': '5' },
  { 'id': 'chest_count_30', 'name': '30', 'avtar': 'images/chest_2.png', 'limited': '5' },
  { 'id': 'chest_count_100', 'name': '100', 'avtar': 'images/chest_3.png', 'limited': '5' },
]
export const MENU_CONFIG = [
  { 'id': 'm1', 'icon': 'images/m_ico_2.png', 'text': 'images/m_txt_2.png', 'is_hot': true, 'url': '12-con-giap', 'type': 'url' },
  { 'id': 'm2', 'icon': 'images/m_ico_4.png', 'text': 'images/m_txt_4.png', 'is_hot': true, 'url': 'vong-quay', 'type': 'url' },
  { 'id': 'm3', 'icon': 'images/m_ico_3.png', 'text': 'images/m_txt_3.png', 'is_hot': true, 'url': 'li-xi', 'type': 'url' },
  { 'id': 'm4', 'icon': 'images/m_ico_5.png', 'text': 'images/m_txt_5.png', 'is_hot': false, 'url': 'loi-chuc', 'type': 'popup' },
  { 'id': 'm5', 'icon': 'images/m_ico_6.png', 'text': 'images/m_txt_6.png', 'is_hot': false, 'url': 'the-ky-hoi', 'type': 'popup' },
  { 'id': 'm6', 'icon': 'images/m_ico_7.png', 'text': 'images/m_txt_7.png', 'is_hot': false, 'url': 'phao', 'type': 'popup' },
  { 'id': 'm7', 'icon': 'images/m_ico_8.png', 'text': 'images/m_txt_8.png', 'is_hot': false, 'url': 'tan-binh', 'type': 'popup' },
]
export const SPIN_CONFIG = [
  { 'id': '1', 'item_name': 'Xe máy WAVE RSX FI 110CC', 'image_url': 'images/s_gift_1.png', 'is_litmited': true, 'quantity': '' },
  { 'id': '2', 'item_name': '1 vé quay kim cương', 'image_url': 'images/s_gift_2.png', 'is_litmited': false, 'quantity': '' },
  { 'id': '3', 'item_name': 'Thẻ tăng 50% kinh nghiệm (3 ngày)', 'image_url': 'images/s_gift_3.png', 'is_litmited': false, 'quantity': '3 ngày' },
  { 'id': '4', 'item_name': '1 Tai nghe sony extra bass mdr-xb650bt', 'image_url': 'images/s_gift_4.png', 'is_litmited': true, 'quantity': '' },
  { 'id': '5', 'item_name': '1 huy hiệu Tết', 'image_url': 'images/s_gift_5.png', 'is_litmited': false, 'quantity': '   x1' },
  { 'id': '6', 'item_name': '1 Hòm thính', 'image_url': 'images/s_gift_6.png', 'is_litmited': false, 'quantity': '' },
  { 'id': '7', 'item_name': 'Áo Tết Kỷ hợi (Nam)', 'image_url': 'images/s_gift_7.png', 'is_litmited': true, 'quantity': '' },
  { 'id': '8', 'item_name': '1 Lửa trại', 'image_url': 'images/s_gift_8.png', 'is_litmited': false, 'quantity': '' },
  { 'id': '9', 'item_name': '1 Thẻ kỷ hợi', 'image_url': 'images/s_gift_9.png', 'is_litmited': false, 'quantity': '' },
  { 'id': '10', 'item_name': 'Quần Tết Kỷ hợi (Nam)', 'image_url': 'images/s_gift_10.png', 'is_litmited': true, 'quantity': '' },
  { 'id': '11', 'item_name': '3 huy hiệu Tết', 'image_url': 'images/s_gift_11.png', 'is_litmited': false, 'quantity': '   x3' },
  { 'id': '12', 'item_name': 'Thẻ tăng 50% Vàng (3 ngày)', 'image_url': 'images/s_gift_12.png', 'is_litmited': false, 'quantity': '3 ngày' },
]