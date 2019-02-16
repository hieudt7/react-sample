import React from 'react'
import Modal from 'components/Modal'
import LuckyHistory from 'components/LuckyHistory'
import LuckyRule from 'components/LuckyRule'
import LuckGift from 'components/LuckGift'
import LuckySend from 'components/LuckySend'
import { SPIN_CONFIG } from 'components/common'
import 'url-search-params-polyfill';
import swal from "sweetalert2"
class LuckyView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isShowModal: null,
      lucky_in_day_count: 0,
      lucky_stage_rewards: [],
      lucky_successful_count: 0,
      accountID: ''
    }
  }

  componentDidMount() {
    //define function,js to run
    console.log('run')
    this.props.getLucky()
    setTimeout(() => {
      var searchParams = new URLSearchParams(window.location.search);
      //claim
      if (searchParams.get('shareid') != null && searchParams.get('shareid') != undefined) {
        if(!this.props.currentUser.login){
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">Đăng nhập để nhận lì xì.</p>',
            confirmButtonText: 'Đăng nhập',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn'
          }).then(function (result) {
            window.location.href='/user/login/1'
          });
          return
        }
        this.props.ClaimShareLucky(searchParams.get('shareid'))
      }
      else if(searchParams.get('shareDone') != null && searchParams.get('shareDone') != undefined){
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Xem Lịch Sử Gửi để biết liệu lì xì của bạn đã có người nhận chưa nhé. Chỉ khi có người nhận lì xì thì mới được tính Đã Gửi thành công</p>',
          confirmButtonText: 'Đăng nhập',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    }, 500);
   
    //--get api
    AOS.init({
      disable: 'mobile'
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.lucky.isShowModal != undefined) {
      this.setState({
        modal: nextProps.lucky.isShowModal
      });
    }
    if (nextProps.lucky.luckyInfo != undefined) {
      console.log(nextProps.lucky.luckyInfo)
      this.setState({
        lucky_in_day_count: nextProps.lucky.luckyInfo.lucky_in_day_count,
        lucky_stage_rewards: nextProps.lucky.luckyInfo.lucky_stage_rewards,
        lucky_successful_count: nextProps.lucky.luckyInfo.lucky_successful_count,
      });
    }
  }
  //action
  handleViewHistory() {
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
    this.props.getHistory()
  }
  handleClaimStage(stage) {
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
    this.props.claimReward(stage)
  }
  openSendLucky() {
    this.setState({
      modal: 'lucky-send',
      accountID: '',
    })
  }
  handleSendLucky() {
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
    else if (this.state.lucky_in_day_count == 10) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Rất tiếc bạn đã hết lượt gửi lì xì hôm nay. Vui lòng Đăng nhập vào ngày mai để nhận 10 lượt gửi </p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    else if (this.state.accountID == '' || this.state.accountID == null || this.state.accountID.trim() == '') {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Vui lòng điền ID người nhận.</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    this.props.sendLucky(this.state.accountID)
  }
  handleShareLucky() {
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
    this.props.shareLucky()
  }
  onChangeAccountID(evt) {
    this.setState({
      accountID: evt.target.value
    });
  }
  stageClaim(stage) {
    if (this.state.lucky_stage_rewards == null || this.state.lucky_stage_rewards == undefined) {
      return
    }
    let status = ''
    let statusClass = this.state.lucky_stage_rewards.find(item => item[0] === stage);
    if (statusClass) {
      status = 'claimed'
    }
    return status
  }
  checkGiftProgress(value, target) {
    let classActive = ''
    if (target >= value) {
      classActive = 'active'
    }
    return classActive
  }
  resendLink(link){
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
    window.location.href = 'https://www.facebook.com/dialog/share?app_id=349255008882543&display=touch&href=https://tet.ff.garena.vn/li-xi?shareid=' + link + '&redirect_uri=https://tet.ff.garena.vn/li-xi?shareDone=1&quote='+encodeURI('Nhận lì xì FreeFire tại đây: https://tet.ff.garena.vn/li-xi?shareid=' + link)+'&hashtag=%23ChơiTếtFreeFire';
  }
  render() {
    const { modal, lucky_in_day_count, lucky_stage_rewards, lucky_successful_count, accountID } = this.state
    let { currentUser, lucky } = this.props;
    return (
      <React.Fragment>
        <div className="lucky-view">
          <span className="left-box">
            <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_logo.png" alt="" className="logo" />
          </span>
          <div className="target-gift">
            <ul>
              <li>
                <a className={`${this.stageClaim(30)} ${this.checkGiftProgress(30, lucky_successful_count)}`} href="javascript:void(0)" onClick={e => this.handleClaimStage(30)}><img src="images/l_gift_1.png" alt="" /></a>
              </li>
              <li>
                <a className={`${this.stageClaim(20)} ${this.checkGiftProgress(20, lucky_successful_count)}`} href="javascript:void(0)" onClick={e => this.handleClaimStage(20)}><img src="images/l_gift_2.png" alt="" /></a>
              </li>
              <li>
                <a className={`${this.stageClaim(10)} ${this.checkGiftProgress(10, lucky_successful_count)}`} href="javascript:void(0)" onClick={e => this.handleClaimStage(10)}><img src="images/l_gift_3.png" alt="" /></a>
              </li>
              <li>
                <div className="limit-lucky-small">
                  <span>đã gửi:</span><b>{lucky_successful_count || 0}</b>
                </div>
              </li>
            </ul>
          </div>
          <div className="group-action-btn">
            <a href="javascript:void(0)" className="red-btn" onClick={() => this.setState({ modal: 'lucky-rule' })}>thể lệ</a>
            <a href="javascript:void(0)" className="red-btn" onClick={e => this.handleViewHistory(e)}>lịch sử gửi</a>
          </div>
          <div className="main-action">
            <a href="javascript:void(0)" onClick={e => this.openSendLucky(e)}><img src="images/l_Btn_gui.png" alt="" /></a>
            <div className="limit-lucky">
              <span>số lì xì hiện có:</span><b>{10 - (lucky_in_day_count || 10)}</b>
            </div>
          </div>
          <img src="images/l_title.png" alt="" className="page-title" />
          <img src="images/l-bg.jpg" alt="" className="full-bg" />
          <img src="images/l_char.png" alt="" className="character" />
        </div>
        <Modal show={modal === 'lucky-history'} closeHandler={() => this.setState({ modal: null })}>
          <LuckyHistory history={lucky.lucky_history} resendLink={this.resendLink.bind(this)}></LuckyHistory>
        </Modal>
        <Modal show={modal === 'lucky-gift'} closeHandler={() => this.setState({ modal: null })}>
          <LuckGift></LuckGift>
        </Modal>
        <Modal show={modal === 'lucky-rule'} closeHandler={() => this.setState({ modal: null })}>
          <LuckyRule></LuckyRule>
        </Modal>
        <Modal show={modal === 'lucky-send'} closeHandler={() => this.setState({ modal: null })}>
          <div className="fire-success">
            <div className="pop-body">
              <div className="exchange-result send-lucky">
                <img src="images/l_longden.png" className="img-light" alt="" />
                <div className="share-via-fb">
                  <h4 className="img-title" >
                    <img src="images/l_send_t_1.png" alt="" />
                  </h4>
                  <a href="javascript:void(0)" className="red-btn" onClick={e => this.handleShareLucky(e)}>chia sẻ ngay</a>
                  <p className="des-gift">*Lưu ý: Mỗi link chia sẻ tương ứng với 1 lì xì dành cho người nhận đầu tiên. Chỉ khi có người nhận lì xì thì mới được tính Đã Gửi thành công</p>
                </div>
                <div className="share-via-uid">
                  <h4 className="img-title" >
                    <img src="images/l_send_t_2.png" alt="" />
                  </h4>
                  <div className="group-action-send">
                    <div>
                      <input type="text" name="" id="" placeholder="ID NGƯỜI NHẬN" value={accountID || ''} onChange={e => this.onChangeAccountID(e)} />
                    </div>
                    <div>
                      <a href="javascript:void(0)" className="red-btn" onClick={e => this.handleSendLucky(e)}>gửi ngay</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

      </React.Fragment>
    )
  }
}

export default LuckyView
