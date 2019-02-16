import React from 'react'
import Modal from 'components/Modal'
import swal from "sweetalert2"
class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
    }
  }
  convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }
  componentDidMount() {
    //define function,js to run
    //--get api
    AOS.init({
      disable: 'mobile'
    });
    //this.props.getUser()
    let endDate = '2019-01-30 22:00:00'
    let countdownDate = this.convertDateForIos(endDate)
    $('.countdown').countdown({
      date: countdownDate,
      render: function (data) {
        $(this.el).html("<div class=days><span>" + this.leadingZeros(data.days, 2) + "</span><span> Ngày</span></div><div><span>" + this.leadingZeros(data.hours, 2) + "</span> <span> giờ &nbsp</span></div><div><span>" + this.leadingZeros(data.min, 2) + " </span><span> phút</span></div><div><span>" + this.leadingZeros(data.sec, 2) + " </span><span> giây</span></div>");
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    //check if have value
    if (this.props.home != nextProps.home) {

    }
    // redirect link
    if (nextProps.currentUser.menuInfo != undefined) {
      if (nextProps.currentUser.menuInfo.event_main != null && nextProps.currentUser.menuInfo.event_main != undefined) {
        window.location.href = nextProps.currentUser.menuInfo.event_main
      }
    }
  }
  handleShareFb() {
    let $this = this
    if (!this.props.currentUser.login) {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn cần đăng nhập để nhận quà miễn phí.</p>',
        confirmButtonText: 'Đóng',
        customClass: 'custom-modal'
      })
      return
    }
    swal({
      title: 'Thông báo',
      html: '<p class="pop-content">Hệ điều hành IOS vui lòng truy cập tet.ff.garena.vn để Nhận quà miễn phí</p>',
      confirmButtonText: 'Đồng ý',
      customClass: 'custom-modal has-btn'
    }).then(function (result) {
      console.log('share')
      $this.props.shareFB('https://tet.ff.garena.vn/')
    });
  }
  render() {
    const { modal } = this.state
    let { currentUser, home } = this.props;
    return (
      <React.Fragment>
        {/* <section className="home-page">
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
          <div className="art">
            <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/art_ef.jpg" alt="" />
          </div>
          <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/zo_logo.png" alt="" className="logo-home" />
          <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/h-foot.png" alt="" className="img-footer" />
          <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_footer.jpg" alt="" className="menu-footer" />
          <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/light.png" alt="" className="light" />
          <div className="page-title animated fadeInUp">
            <div className="group-flower">
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/page_title_home.png" alt="" className="page-title-txt" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_1.png" alt="" className="f-1 animated zoomIn" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_4.png" alt="" className="f-4 animated zoomIn" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_3.png" alt="" className="f-3 animated zoomIn" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_5.png" alt="" className="f-5 animated zoomIn" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/f_2.png" alt="" className="f-2 animated zoomIn" />
            </div>
          </div>
          <div className="group-vid">
            <h1 className="logo-main">
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/title-logo.png" alt="" className="main-logo" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/ff-logo-light.png" alt="" className="light ab" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-1.png" alt="" className="clound-1 ab" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-2.png" alt="" className="clound-2 ab" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-3.png" alt="" className="clound-3 ab" />
              <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/clound-4.png" alt="" className="clound-4 ab" />
            </h1>
            <div className="video-btn">
              <div className="video-src">
                <video data-src="" src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/maxim.mp4" loop={true} autoPlay={true} muted={true}></video>
              </div>
              <a className="video-play" href="https://www.youtube.com/watch?v=SlvD26EIt54?autolay=1&muted=1" data-fancybox=""></a>
            </div>
          </div>
          <div className="foot-menu animated fadeInLeft">
            <div className="tbl-group">
              <div className="group-btn">
                <a href="https://www.facebook.com/116438885738795/posts/324341028281912/" target="_blank" title="Đọc Truyện" className="red-story">
                  <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/btn_read.png" alt="" />
                </a>
                <a onClick={e => this.handleShareFb()} title="chia sẻ" className="share">
                  <img src="https://cdn.vn.garenanow.com/web/ff/ff_new_year_2019/images/btn_share_1.png" alt="" />
                </a>
              </div>
              <div className="countdown"></div>
            </div>
          </div>
        </section> */}
      </React.Fragment>
    )
  }
}

export default HomeView
