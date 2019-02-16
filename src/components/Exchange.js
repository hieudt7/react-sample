import React from 'react'
export default ({ itemReward }) =>
  (itemReward.length) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="pop-title">chúc mừng bạn nhận được</h3>
      <div className="pop-body">
        <div className="exchange-result">
          <h4 className="gift-name">thẻ {itemReward[0].zodiac_name}</h4>
          <div className="gif-img">
            <img src={'images/item_' + itemReward[0].zodiac_order + '.png'} alt="" />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
