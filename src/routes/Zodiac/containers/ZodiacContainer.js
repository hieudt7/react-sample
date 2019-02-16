import { connect } from 'react-redux'
import ZodiacView from '../components/ZodiacView'

import {
  getUserZodiac,
  DrawZodiac,
  getTop,
  getChestInfo,
  buyChest,
  claimReward,

} from '../modules/actions'

const mapDispatchToProps = {
  getUserZodiac,
  DrawZodiac,
  getTop,
  getChestInfo,
  buyChest,
  claimReward,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  zodiac: state.zodiac
})

export default connect(mapStateToProps, mapDispatchToProps)(ZodiacView)
