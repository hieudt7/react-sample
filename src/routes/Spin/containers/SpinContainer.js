import { connect } from 'react-redux'
import SpinView from '../components/SpinView'

import {
  getWheel,
  getTop,
  updateInfo,
  getSpin,

} from '../modules/actions'

const mapDispatchToProps = {
  getWheel,
  getTop,
  updateInfo,
  getSpin,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  spin: state.spin
})

export default connect(mapStateToProps, mapDispatchToProps)(SpinView)
