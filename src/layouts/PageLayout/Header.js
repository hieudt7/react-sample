import React from "react";
import { MENU_CONFIG } from "../../components/common"
import Modal from "../../components/Modal"
import PopLichSuKien from "../../components/PopLichSuKien"
import PopPhao from "../../components/PopPhao"
import Pop500 from "../../components/Pop500"
import PopTanBinh from "../../components/PopTanBinh"
import PopTheHoi from "../../components/PopTheHoi"
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      menuStatus: null,
      activeLink: null,
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    // redirect link
    if (nextProps.currentUser.menuInfo != undefined) {
      console.log(nextProps.currentUser)
      this.setState({
        menuStatus: nextProps.currentUser.menuInfo.event_list
      })
    }
  }
  _handleClick(type, url) {
    console.log(type)
    if (type == 'popup') {
      this.setState({
        modal: url
      })
    }
    else {
      window.location.href = url
    }
  }
  renderMenuBar(menuStatus) {
    let CurrentMenu = window.location.pathname.split('/')[1]
    if (menuStatus == undefined || menuStatus == null) {
      return
    }
    return (
      MENU_CONFIG.map((menu, index) => (
        <li key={index} className={`${menuStatus[index] ? '' : 'disable'} ${menu.is_hot ? 'hot-menu' : ''} ${menu.url == CurrentMenu ? 'active' : ''}`}>
          <a href="#" onClick={this._handleClick.bind(this, menu.type, menu.url)}>
            <i><img src={menu.icon} alt="" /></i>
            <span><img src={menu.text} alt="" /></span>
          </a>
        </li>
      ))
    )
  }
  render() {
    let { currentUser } = this.props;
    const { modal, menuStatus } = this.state
    return (
      <React.Fragment>
        <div className="side-bar">
          <ul>
            <li className="celendar">
              <a onClick={this._handleClick.bind(this, 'popup', 'lich-su-kien')}>
                <i><img src="images/m_ico_1.png" alt="" /></i>
                <span><img src="images/m_txt_1.png" alt="" /></span>
              </a>
            </li>
            {this.renderMenuBar(menuStatus)}
          </ul>
        </div>
        <Modal show={modal === 'lich-su-kien'} closeHandler={() => this.setState({ modal: null })}>
          <PopLichSuKien></PopLichSuKien>
        </Modal>
        <Modal show={modal === 'phao'} closeHandler={() => this.setState({ modal: null })}>
          <PopPhao></PopPhao>
        </Modal>
        <Modal show={modal === 'loi-chuc'} closeHandler={() => this.setState({ modal: null })}>
          <Pop500></Pop500>
        </Modal>
        <Modal show={modal === 'tan-binh'} closeHandler={() => this.setState({ modal: null })}>
          <PopTanBinh></PopTanBinh>
        </Modal>
        <Modal show={modal === 'the-ky-hoi'} closeHandler={() => this.setState({ modal: null })}>
          <PopTheHoi></PopTheHoi>
        </Modal>
      </React.Fragment>
    );
  }
}
