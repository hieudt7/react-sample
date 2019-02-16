import React from 'react'
export default ({ historyList, historyType }) =>
  (historyList && historyList != undefined) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="pop-title">bảng xếp hạng</h3>
      <div className="pop-body clearfix">
        <div className="tbl-spin-top g-1">
          <p className="text-center">
            <img src="images/spin_his_1.png" alt="" className="title-1" />
          </p>
          <table className="spin-tbl">
            <thead>
              <tr>
                <th>thời gian</th>
                <th>vật phẩm</th>
              </tr>
            </thead>
            <tbody>
              {(historyList.history) &&
                historyList.history.map((his, index) => (
                  <tr key={index}>
                    <td>{his.create_time}</td>
                    <td>{his.display_name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="tbl-spin-top g-2">
          <p className="text-center">
            <img src="images/spin_his_2.png" alt="" className="title-2" />
          </p>
          <table className="spin-tbl">
            <thead>
              <tr>
                <th>người chơi</th>
                <th>vật phẩm</th>
              </tr>
            </thead>
            <tbody>
              {(historyList.top) &&
                historyList.top.map((his, index) => (
                  <tr key={index}>
                    <td>{his.nickname}</td>
                    <td>{his.display_name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </React.Fragment>
