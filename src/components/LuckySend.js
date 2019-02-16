import React from 'react'
export default ({ itemReward }) =>
  <React.Fragment>
    <div className="fire-success">
      <div className="pop-body">
        <div className="exchange-result send-lucky">
        <img src="images/l_longden.png" className="img-light" alt=""/>
          <div className="share-via-fb">
            <h4 className="img-title" >
              <img src="images/l_send_t_1.png" alt="" />
            </h4>
            <a href="javascript:voi(0)" className="red-btn" onClick={e => this.handleViewHistory(e)}>chia sẻ ngay</a>
            <p className="des-gift">mỗi link tương ứng với 1 phần quà duy nhất. sau khi 1 người chơi nhận quà, link sẽ vô hiệu</p>
          </div>
          <div className="share-via-uid">
          <h4 className="img-title" >
              <img src="images/l_send_t_2.png" alt="" />
            </h4>
            <div className="group-action-send">
              <div>
                <input type="text" name="" id="" placeholder="ID NGƯỜI NHẬN"/>
              </div>
              <div>
                <a href="javascript:voi(0)" className="red-btn" onClick={e => this.handleViewHistory(e)}>gửi ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
