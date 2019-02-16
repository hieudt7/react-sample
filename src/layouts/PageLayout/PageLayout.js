import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../PageLayout/Header'
import { getCurrentUser, register, getHistory } from 'authentication/actions'
class PageLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
    }
  }
  componentDidMount() {
    this.props.getCurrentUser()
    $(window).resize(function () {
      let e = $(window).width();
      e >= 1920 ? $("html").css("font-size", "10px") : e >= 1200 ? $("html").css("font-size", 10 * e / 1920 + "px") : $("html").css("font-size", 10 * e / 1920 + "px")
    })
    $(window).trigger('resize')
  }

  componentWillReceiveProps(nextProps) {
    //redirect page
  }

  componentWillMount() {
  }

  render() {
    const { modal } = this.state
    const { currentUser } = this.props
    return (
      <div id={`wrapper`}>
        <main>
          <div className="top-menu">
            {!currentUser.login ? (
              <React.Fragment>
                <div className="user-group">
                  <a href="/user/login/1">ĐĂNG NHẬP</a>
                </div>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <div className="user-group">
                    <a href="/user/logout">{(currentUser.userInfo.nickname)} [đăng xuất]</a>
                  </div>
                </React.Fragment>
              )}
          </div>
          <div className="event-group">
            <Header currentUser={currentUser}/>
            {this.props.children}
          </div>
        </main>
        <div className="modal modal-noti">
          <div className="modal-dialog animated fadeInDown">
            <div className="modal-content">
              <div className="modal-body">
                <h3 className="pop-title">Thông báo</h3>
                <p className="info-text">
                  Bạn nên quay ngang màn hình điện thoại để có trải nghiệm tốt hơn
                </p>
              </div>
            </div>
          </div>
          <div className="modal-backdrop animated fade show"></div>
        </div>
      </div>
    )
  }
}
PageLayout.propTypes = {
  children: PropTypes.node,
}

const mapDispatchToProps = {
  getCurrentUser: getCurrentUser,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  location: state.location,
  home: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
