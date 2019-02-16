import { connect } from 'react-redux'
import LuckyView from '../components/LuckyView'

import {
  getLucky,
  sendLucky,
  shareLucky,
  claimReward,
  getHistory,
  ClaimShareLucky,

} from '../modules/actions'

const mapDispatchToProps = {
  getLucky,
  sendLucky,
  shareLucky,
  claimReward,
  getHistory,
  ClaimShareLucky,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  lucky: state.lucky
})

export default connect(mapStateToProps, mapDispatchToProps)(LuckyView)
