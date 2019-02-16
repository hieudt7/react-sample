import React from 'react'
export default ({ tops }) =>
  (tops) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="pop-title">bảng xếp hạng</h3>
      <div className="pop-body top-tbl">
        <table className="ff-tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Số thẻ</th>
            </tr>
          </thead>
          <tbody>
            {tops.map((top, index) => (
              <tr key={index}>
                <td>{top.account_id}</td>
                <td>{top.nickname}</td>
                <td>{top.zodiac_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </React.Fragment>
