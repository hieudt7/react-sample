import React from 'react'
import Modal from 'components/Modal'
import SpinTop from 'components/SpinTop'
import SpinGift from 'components/SpinGift'
import SpinRule from 'components/SpinRule'
import { SPIN_CONFIG } from 'components/common'
import ReactTooltip from 'react-tooltip'
import swal from "sweetalert2"
class SpinWork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      gems_balance: 0,
      wheel_free_spin: 0,
      wheel_paid_spin: 0,
      historyType: '',
      isUpdateInfo: false,
      pName: '',
      pPhone: '',
      pAddress: '',
      display_all_prize: false,
    }
  }

  componentDidMount() {
    //define function,js to run
    //--get api
    this.props.getWheel()
    this.props.getTop(false);
    AOS.init({
      disable: 'mobile'
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.spin.isShowModal != undefined) {
      this.setState({
        modal: nextProps.spin.isShowModal
      });
      if (nextProps.spin.isShowModal == 'spin-gift' || nextProps.spin.isShowModal == 'err1-spin') {
        $('.group-router-btn').removeClass('disable-click')
      }
    }
    if (nextProps.spin.wheelInfo != undefined) {
      this.setState({
        gems_balance: nextProps.spin.wheelInfo.gems_balance,
        wheel_free_spin: nextProps.spin.wheelInfo.wheel_free_spin,
        wheel_paid_spin: nextProps.spin.wheelInfo.wheel_paid_spin,
        display_all_prize: nextProps.spin.wheelInfo.display_all_prize,
      });
      if (nextProps.spin.isUpdated) {
        this.setState({
          isUpdateInfo: nextProps.spin.isUpdated
        });
      }
      if (nextProps.spin.wheelInfo.real_name !== null && nextProps.spin.wheelInfo.real_name !== undefined && nextProps.spin.wheelInfo.real_name !== '') {
        this.setState({
          isUpdateInfo: true,
        });
      }
    }
  }
  //action
  handleViewTop(type) {
    if (!this.props.currentUser.login) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Vui lòng đăng nhập để tham gia sự kiện.</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    else if (this.props.currentUser.userInfo.account_id == null) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn vui lòng tạo tài khoản Garena Free Fire để tham gia sự kiện. Tải app tại: <a href="https://ff.garena.vn/">https://ff.garena.vn/</a>.</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }

    this.props.getTop(true);
    this.setState({
      historyType: type,
    });
  }
  handleSpin(spin_type) {
    let $this = this
   
    $('.group-router-btn').addClass('disable-click')
    if (!this.props.currentUser.login) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Vui lòng đăng nhập để tham gia sự kiện.</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      $('.group-router-btn').removeClass('disable-click')
      return
    }
    else if (this.props.currentUser.userInfo.account_id == null) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn vui lòng tạo tài khoản Garena Free Fire để tham gia sự kiện. Tải app tại: <a href="https://ff.garena.vn/">https://ff.garena.vn/</a>.</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      $('.group-router-btn').removeClass('disable-click')
      return
    }
    else if (!this.state.isUpdateInfo) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn vui lòng cập nhật thông tin cá nhân trước khi tham gia sự kiện để BTC liên lạc gửi quà</p>',
        confirmButtonText: 'Đồng ý',
        animation: false,
        customClass: 'custom-modal animated zoomIn has-btn'
      }).then(function (result) {
        $this.setState({
          modal: 'update-info',
        });
        $('.group-router-btn').removeClass('disable-click')
      });
      return
    }
    if (spin_type == 'free') {
      if (this.state.wheel_free_spin >= 1) {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Bạn đã hết lượt quay miễn phí ngày hôm nay. Đăng nhập vào ngày mai để nhận 1 lượt quay miễn phí.</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        $('.group-router-btn').removeClass('disable-click')
        return
      }
    }
    else if (spin_type == 'paid') {
      if (this.state.wheel_paid_spin >= 5) {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Bạn đã hết lượt quay kim cương ngày hôm nay.</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        $('.group-router-btn').removeClass('disable-click')
        return
      }
    }
    this.props.getSpin(spin_type)
  }
  onChangeName(evt) {
    this.setState({
      pName: evt.target.value
    });
  }
  onChangePhone(evt) {
    this.setState({
      pPhone: evt.target.value
    });
  }
  onChangeAddress(evt) {
    this.setState({
      pAddress: evt.target.value
    });
  }
  updateInfo(name, phone, address) {
    if (name == null || phone == null || address == null) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn phải điền đầy đủ thông tin cá nhân trước khi tham gia sự kiện</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    else if (name.trim() == '' || phone.trim() == '' || address.trim() == '') {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn phải điền đầy đủ thông tin cá nhân trước khi tham gia sự kiện</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    this.props.updateInfo(name, address, phone)
  }
  checkActiveGift(index, isLimited, type) {
    let resultClass = '',
      resultG = ''
    if (isLimited && !this.state.display_all_prize) {
      resultClass = 'url(#spinGradient3)'
      resultG = 'url(#grayscale)'
    }
    else {
      if (index % 2) {
        resultClass = 'url(#spinGradient1)'
      }
      else {
        resultClass = 'url(#spinGradient2)'
      }
    }
    if (type !== undefined && type == 'class') {
      resultClass = resultG
    }
    return resultClass
  }
  render() {
    const { modal, gems_balance, wheel_free_spin, wheel_paid_spin, historyType, pName, pPhone, pAddress, display_all_prize } = this.state
    let { currentUser, spin } = this.props;
    const size = 12
    const x = 300 * Math.sin(Math.PI / size)
    const y = -300 * Math.cos(Math.PI / size)
    return (
      <React.Fragment>
        <div className="spin-view">
          <span className="left-box">
            <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_logo.png" alt="" className="logo" />
          </span>
          <span className="left-box-txt">
            <img src="images/box_yellow.png" alt="" />
            <span>đăng nhập <br /><span>free  1 lượt quay/ngày</span></span>
          </span>
          <span className="right-box">
            <img src="images/box_red.png" alt="" />
            <span>số kc đang có <br /><b>{gems_balance || 0}</b> <i><img src="images/ico_diamond.png" alt="" /></i></span>
            <a onClick={() => this.setState({ modal: 'spin-rule' })} className="btn_thele" href="#"><img src="images/btn_the_le.png" alt="" /></a>
          </span>
          <div className="gift-box animated fadeInUp"><img src="images/s_gift.png" alt="" /></div>
          <a href="#" onClick={e => this.handleViewTop(e, 'history')} className="list-user"><img src="images/btn_danh_sach.png" alt="" /></a>
          <div className="spin-router">
            <div className="wheel">
              <img src="images/spin_arrow.png" alt="" className="imgs_spin_arr" />
              <svg className="whel-body" style={{ transform: `rotate(${0 + 0}turn)` }} viewBox="-305 -305 610 610"
                xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                  <linearGradient id="spinGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4d0000" />
                    <stop offset="100%" stopColor="#c00404" />
                  </linearGradient>
                  <linearGradient id="spinGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8e488" />
                    <stop offset="100%" stopColor="#f0af24" />
                  </linearGradient>
                  <linearGradient id="spinGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#343434" />
                    <stop offset="100%" stopColor="#323232" />
                  </linearGradient>
                </defs>
                {SPIN_CONFIG.map((item, index) => (
                  <g key={index} transform={`rotate(${index * 360 / size})`} data-tip={item.item_name}>
                    <path d={`M0,0 L${-x},${y} A300 300 0 0 1 ${x},${y} Z`} fill={this.checkActiveGift(index, item.is_litmited)} />
                    <image filter={this.checkActiveGift(index, item.is_litmited, 'class')} xlinkHref={item.image_url} x={-0.8 * x} y={0.9 * y} height={1.7 * x} width={1.7 * x} />
                    <text xmlSpace="preserve" className="quantity" x={-0.3 * x} y={0.45 * y}>{item.quantity}</text>
                    {(item.is_litmited && !display_all_prize) &&
                      <text className="mask-text" y={1 * y}>
                        <tspan x={-0.75 * x} dy="1.2em">TỪ MÙNG</tspan>
                        <tspan x={-0.4 * x} dy="1.5em">1 TẾT</tspan>
                      </text>
                    }
                  </g>
                ))}
                <filter id="grayscale">
                  <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
                </filter>
              </svg>
              <ReactTooltip key={size} />
            </div>
            <img src="images/s_border.png" alt="" className="main-router" />
            <div className="group-router-btn">
              <a href="#" className="btn_free" onClick={event => this.handleSpin('free')}>
                <span>{1-wheel_free_spin || 0}/1</span>
                <img src="images/spin_free.png" alt="" />
              </a>
              <a href="#" className="btn_diamond" onClick={event => this.handleSpin('paid')}>
                <span>{5-wheel_paid_spin || 0}/5</span>
                <img src="images/btn_diamond.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        {
          (spin.topInfo) &&
          <marquee scrollamount="3" behavior="scroll" className="mr-bot">
            {spin.topInfo.top.map((list, index) => (
              <span key={index} className="mrq-content">
                {list.nickname} đã nhận được {list.display_name}
              </span>
            ))}
          </marquee>
        }
        <img src="images/spin-bg.jpg" alt="" className="full-bg" />
        <Modal show={modal === 'top'} customClass={'history-spin'} closeHandler={() => this.setState({ modal: null })}>
          <SpinTop historyList={spin.topInfo} historyType={historyType}></SpinTop>
        </Modal>
        <Modal show={modal === 'spin-gift'} closeHandler={() => this.setState({ modal: null })}>
          <SpinGift itemReward={spin.spinItem}></SpinGift>
        </Modal>
        <Modal show={modal === 'spin-rule'} closeHandler={() => this.setState({ modal: null })}>
          <SpinRule></SpinRule>
        </Modal>
        <Modal show={modal === 'update-info'} closeHandler={() => this.setState({ modal: null })}>
          <div className="fire-success">
            <h3 className="pop-title">thông tin người chơi</h3>
            <div className="pop-body">
              <div className="account-info">
                <div className="group-info">
                  <div className="lbel">Họ Và Tên</div>
                  <div>
                    <input type="text" value={pName || ''} maxLength="255" onChange={e => this.onChangeName(e)} />
                  </div>
                </div>
                <div className="group-info">
                  <div className="lbel">Số Điện Thoại</div>
                  <div>
                    <input type="text" value={pPhone || ''} maxLength="255" onChange={e => this.onChangePhone(e)} />
                  </div>
                </div>
                <div className="group-info">
                  <div className="lbel">Địa Chỉ Nhận Quà</div>
                  <div>
                    <input type="text" value={pAddress || ''} maxLength="255" onChange={e => this.onChangeAddress(e)} />
                  </div>
                </div>
                <p className="note-txt">*Lưu ý: Thông tin tài khoản chỉ được nhập 1 lần duy nhất</p>
                <div className="group-confirm-btn">
                  <a href="javascript:void(0)" onClick={() => this.setState({ modal: null })} className="btn-round cancel">
                    <img src="images/btn_huy.png" alt="" />
                  </a>
                  <a href="javascript:void(0)" onClick={event => this.updateInfo(pName, pPhone, pAddress)} className="btn-round">
                    <img src="images/btn_dong_y.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default SpinWork
