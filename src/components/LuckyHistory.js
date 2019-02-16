import React from 'react'
const mapEvenName = (status) => {
  if (!status) { return }
  let eventStatus;
  switch (status) {
    case 'complete':
      eventStatus = 'Đã nhận'
      break;
    case 'new':
      eventStatus = 'Gửi ngay'
      break;
    default:
      break;
  }
  return eventStatus
}
export default ({ history,resendLink }) =>
  (history) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="pop-title">lịch sử gửi</h3>
      <div className="pop-body top-tbl">
        <table className="ff-tbl">
          <thead>
            <tr>
              <th>STT</th>
              <th>ĐƯỜNG LINK</th>
              <th>TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody>
            {history.map((his, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="share-link">
                  {his.send_type == 'send' ? (
                    <span>Người nhận: {his.receiver_account_id}</span>
                  ) : (
                      his.status == 'complete' ? (
                        <span>Người nhận: {his.receiver_account_id}</span>
                      ) : (
                          <span>{'https://tet.ff.garena.vn/li-xi?shareid='+his.uuid}</span>
                        )
                    )}
                </td>
                <td>
                  {his.status == 'complete' ? (
                    <span>Đã nhận</span>
                  ) : (
                      <a href="javascript:void(0)" onClick={() => resendLink(his.uuid)} className="red-btn small-btn">Gửi lại</a>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </React.Fragment>
