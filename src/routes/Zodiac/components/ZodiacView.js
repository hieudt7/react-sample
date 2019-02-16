import React from 'react'
import Modal from 'components/Modal'
import Rule from 'components/Rule'
import Top from 'components/Top'
import Chest from 'components/Chest'
import Exchange from 'components/Exchange'
import PigCard from 'components/PigCard'
import { CHEST_INFO } from 'components/common'
import swal from "sweetalert2"
class ZodiacView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      draw_balance: 0,
      zodiac_draw_count: 0,
      zodiac_count: 0,
      player_drawn_rewards: null,
      stage_rewards: null,
      chest: null,
      chestStatus: null,
      zodiac_pig: false,
      unique_list: null,
    }
  }

  componentDidMount() {
    //define function,js to run
    //--get api
    this.props.getUserZodiac()
    AOS.init({
      disable: 'mobile'
    });
    this.setState({ chest: CHEST_INFO })

  }
  componentWillReceiveProps(nextProps) {
    //check if have value
    if (nextProps.zodiac.userZodiacInfo != undefined) {
      this.setState({
        draw_balance: nextProps.zodiac.userZodiacInfo.draw_balance,
        zodiac_draw_count: nextProps.zodiac.userZodiacInfo.zodiac_draw_count,
        zodiac_count: nextProps.zodiac.userZodiacInfo.zodiac_count,
        player_drawn_rewards: nextProps.zodiac.userZodiacInfo.player_drawn_rewards,
        stage_rewards: nextProps.zodiac.userZodiacInfo.stage_rewards
      });
    }
    if (nextProps.zodiac.isShowModal != undefined) {
      this.setState({
        modal: nextProps.zodiac.isShowModal
      });
    }
    if (nextProps.zodiac.chestStatus != undefined) {
      this.setState({
        chestStatus: nextProps.zodiac.chestStatus
      });
    }
    if (nextProps.zodiac.userZodiacInfo.unique_list != undefined) {
      this.setState({
        unique_list: nextProps.zodiac.userZodiacInfo.unique_list
      });
    }

  }
  handleViewTop() {
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
    this.props.getTop();
  }
  handleViewChest() {
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
    this.props.getChestInfo()
  }
  handleExchange() {
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
    else if (this.state.draw_balance == 0) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn chưa có huy hiệu Tết để Đổi Thẻ</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    this.props.DrawZodiac(1);
  }
  checkGiftProgress(value, target) {
    let classActive = ''
    if (target >= value) {
      classActive = 'active'
    }
    return classActive
  }
  checkUserCard(order, type) {
    let ressult = ''
    switch (type) {
      case 'image':
        let cardName = 'item_lock.png';
        if (!this.state.player_drawn_rewards || !this.state.player_drawn_rewards == null || !this.state.player_drawn_rewards == undefined) {
          return
        }
        let cardOwner = this.state.player_drawn_rewards.find(item => item[0] === order);
        if (cardOwner) {
          cardName = 'item_' + order + '.png'
        }
        ressult = cardName
        break;
      case 'classBox':
        if (!this.state.player_drawn_rewards || !this.state.player_drawn_rewards == null || !this.state.player_drawn_rewards == undefined) {
          return
        }
        let cardOwnerClass = this.state.player_drawn_rewards.find(item => item[0] === order);
        if (cardOwnerClass) {
          ressult = 'box-open'
        }
        break;
      default:
        break;
    }

    return ressult
  }
  renderZodiacItem(numberItem, index) {
    let zodiacItem = []
    for (let i = 1; i <= numberItem; i++) {
      if (!this.props.currentUser.login || this.props.currentUser.userInfo.account_id == null) {
        zodiacItem.push(
          <li key={i}>
            <div className='box'>
              <img src='https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/item_lock.png' alt="" />
            </div>
          </li>
        )
      }
      else {
        zodiacItem.push(
          <li key={i}>
            <div className={`box ${this.checkUserCard(i + index, 'classBox')}`}>
              <img src={'https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/' + this.checkUserCard(i + index, 'image')} alt="" />
            </div>
          </li>
        )
      }

    }
    return zodiacItem
  }
  buyChest(price, limited, buyTimes) {
    if (limited == buyTimes) {
      let chestType = ''
      switch (parseInt(price)) {
        case 10:
          chestType = 'Hòm cấp thường'
          break;
        case 30:
          chestType = 'Hòm cấp cao'
          break;
        case 100:
          chestType = 'Hòm siêu cấp'
          break;
        default:
          break;
      }
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn đã đạt giới hạn mua ' + chestType + ' ngày hôm nay. Vui lòng quay lại vào ngày mai</p>',
        confirmButtonText: 'Đóng',
        animation: false,
        customClass: 'custom-modal animated zoomIn '
      })
      return
    }
    this.props.buyChest(parseInt(price))
  }
  handleClaimStage(type, stage) {
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
    this.props.claimReward(type, stage)
  }
  stageClaim(type, stage) {
    if (this.state.stage_rewards == null || this.state.stage_rewards == undefined) {
      return
    }
    let status = ''
    let statusClass = this.state.stage_rewards.find(item => item[1] === stage);
    if (statusClass) {
      status = 'claimed'
    }
    return status
  }
  render() {
    const { modal, draw_balance, zodiac_draw_count, zodiac_count, chest, chestStatus, unique_list } = this.state
    let { currentUser, zodiac } = this.props;
    return (
      <React.Fragment>
        <div className="event-content">
          <div className="zodiac-content">
            <div className="progress-left">
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_logo.png" alt="" className="logo" />
              <div className="progress-vertical">
                <div className="progress-outline">
                  <div className="progress-line" style={{ height: zodiac_draw_count * 100 / 120 + '%' }}></div>
                </div>
                <div className="progress-target">
                  <a className={`${this.stageClaim('draw', 30)} ${this.checkGiftProgress(30, zodiac_draw_count)}`} href="#" onClick={e => this.handleClaimStage('draw', 30)}>
                    <span className={`number ${this.checkGiftProgress(30, zodiac_draw_count)}`}>30</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_4.png" alt="" />
                      </span>
                      <p>1000 Vàng</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('draw', 60)} ${this.checkGiftProgress(60, zodiac_draw_count)}`} href="#" onClick={e => this.handleClaimStage('draw', 60)}>
                    <span className={`number ${this.checkGiftProgress(60, zodiac_draw_count)}`}>60</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_3.png" alt="" />
                      </span>
                      <p>1 Hộp mặt nạ phù thủy</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('draw', 90)} ${this.checkGiftProgress(90, zodiac_draw_count)}`} href="#" onClick={e => this.handleClaimStage('draw', 90)}>
                    <span className={`number ${this.checkGiftProgress(90, zodiac_draw_count)}`}>90</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_2.png" alt="" />
                      </span>
                      <p>1 Hộp súng màu hồng</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('draw', 120)} ${this.checkGiftProgress(120, zodiac_draw_count)}`} href="#" onClick={e => this.handleClaimStage('draw', 120)}>
                    <span className={`number ${this.checkGiftProgress(120, zodiac_draw_count)}`}>120</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_1.png" alt="" />
                      </span>
                      <p>Lựu Nước hoa nam (vĩnh viễn)</p>
                    </span>
                  </a>
                </div>
              </div>
              <div className="progress-name">
                <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/arrow-up.png" alt="" className="art" />
                <div className="box-name">
                  {zodiac_draw_count}
                </div>
                <p>huy hiệu <br /> đã đổi</p>
              </div>
            </div>
            <div className="main-content">
              <div className="top-menu">
                <div className="group-label">
                  <a href="#" onClick={() => this.setState({ modal: 'rule' })} className="rule">
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_thele.png" alt="" />
                  </a>
                  <h1 className="logo-main">
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/title-logo.png" alt="" className="main-logo" />
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/ff-logo-light.png" alt="" className="light ab" />
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-1.png" alt="" className="clound-1 ab" />
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-2.png" alt="" className="clound-2 ab" />
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-3.png" alt="" className="clound-3 ab" />
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-4.png" alt="" className="clound-4 ab" />
                  </h1>
                  <span className="count">
                    <span>{draw_balance}</span>
                    <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_huyhieu.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="zod-item">
                <div className="row-gift">
                  <ul>
                    {this.renderZodiacItem(4, 0)}
                  </ul>
                </div>
                <div className="row-gift">
                  <ul>
                    {this.renderZodiacItem(4, 4)}
                  </ul>
                </div>
                <div className="row-gift">
                  <ul>
                    {this.renderZodiacItem(4, 8)}
                  </ul>
                </div>
              </div>
              <div className="foot-menu text-center">
                <div>
                  <a className="btn_xephang" href="#" onClick={e => this.handleViewTop(e)}><img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/btn_xephang.png" alt="" /></a>
                </div>
                <div>
                  <a className="btn_doithe" href="#" onClick={e => this.handleExchange(e)}><img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/btn_doithe.png" alt="" /></a>
                </div>
                <div>
                  <a className="btn_muahom" href="#" onClick={e => this.handleViewChest(e)}><img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/btn_muahom.png" alt="" /></a>
                </div>
              </div>
              {(unique_list) &&
                <marquee scrollamount="3" behavior="scroll">
                  {unique_list.map((list, index) => (
                    <span key={index} className="mrq-content">
                      {list.nickname} đã nhận được {list.display_name}
                    </span>
                  ))}
                </marquee>
              }
            </div>
            <div className="progress-left progress-right">
              <div className="progress-vertical">
                <div className="progress-outline">
                  <div className="progress-line" style={{ height: zodiac_count * 100 / 12 + '%' }}></div>
                </div>
                <div className="progress-target">
                  <a className={`${this.stageClaim('zodiac', 4)} ${this.checkGiftProgress(4, zodiac_count)}`} href="#" onClick={e => this.handleClaimStage('zodiac', 4)}>
                    <span className={`number ${this.checkGiftProgress(4, zodiac_count)}`}>4</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_8.png" alt="" />
                      </span>
                      <p>4 Vé VQMM Vàng</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('zodiac', 7)} ${this.checkGiftProgress(7, zodiac_count)}`} href="#" onClick={e => this.handleClaimStage('zodiac', 7)}>
                    <span className={`number ${this.checkGiftProgress(7, zodiac_count)}`}>7</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_7.png" alt="" />
                      </span>
                      <p>1 Vé VQMM Kim Cương</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('zodiac', 10)} ${this.checkGiftProgress(10, zodiac_count)}`} href="#" onClick={e => this.handleClaimStage('zodiac', 10)}>
                    <span className={`number ${this.checkGiftProgress(10, zodiac_count)}`}>10</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_6.png" alt="" />
                      </span>
                      <p>1 Hộp ma thuật</p>
                    </span>
                  </a>
                  <a className={`${this.stageClaim('zodiac', 12)} ${this.checkGiftProgress(12, zodiac_count)}`} href="#" onClick={e => this.handleClaimStage('zodiac', 12)}>
                    <span className={`number ${this.checkGiftProgress(12, zodiac_count)}`}>12</span>
                    <span className="box">
                      <span>
                        <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/p_g_5.png" alt="" />
                      </span>
                      <p>12 nhân vật và 12 bộ VQMM</p>
                    </span>
                  </a>
                </div>
              </div>
              <div className="ppr-name">
                <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/arrow-up.png" alt="" className="art" />
                <p>THẺ</p>
              </div>
            </div>
          </div>
          <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zodiac_bg.jpg" alt="" className="full-bg" />
        </div>
        <Modal show={modal === 'rule'} closeHandler={() => this.setState({ modal: null })}>
          <Rule></Rule>
        </Modal>
        <Modal show={modal === 'top'} closeHandler={() => this.setState({ modal: null })}>
          <Top tops={zodiac.topUser}></Top>
        </Modal>
        <Modal show={modal === 'chest'} customClass={'lg-size'} closeHandler={() => this.setState({ modal: null })}>
          <Chest chest={chest} chestStatus={chestStatus} buyChest={this.buyChest.bind(this)}></Chest>
        </Modal>
        <Modal show={modal === 'exchange'} closeHandler={() => this.setState({ modal: null })}>
          <Exchange itemReward={zodiac.drawItem}></Exchange>
        </Modal>
        <Modal show={modal === 'pig-card'} closeHandler={() => this.setState({ modal: null })}>
          <PigCard></PigCard>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ZodiacView
