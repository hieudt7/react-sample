import React from 'react'
export default ({ itemReward }) =>
  (itemReward) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="pop-title">chúc mừng bạn nhận được</h3>
      <div className="pop-body">
        <div className="exchange-result">
          <h4 className="gift-name">{itemReward.item_name}</h4>
          <div className="gif-img-spin">
            <img src={'images/s_gift_' + itemReward.item_order + '.png'} alt="" />
          </div>
          {itemReward.in_game_item ? (
            <p className="des-gift">Quà sẽ được gửi vào mail trong game</p>
          ) : (
              <p className="des-gift">Ban tổ chức sẽ liên lạc để gửi quà cho bạn sau khi sự kiện kết thúc</p>
            )}
        </div>
      </div>
    </div>
  </React.Fragment>
