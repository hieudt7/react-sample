import React from 'react'
const mapEvenStatus = (id,chestStatus) => {
  if (!id || !chestStatus) { return }
  return chestStatus[id]
}
export default ({ chest, chestStatus,buyChest }) =>
  (chestStatus) &&
  <React.Fragment>
    <div className="fire-success">
      <div className="pop-body">
        <div className="buy-chest">
          <h3 className="current-diamond">
            <p>số kim cương hiện có</p>
            <span>{chestStatus.gems_balance} <i><img src="images/ico_diamond.png" alt="" /></i></span>
          </h3>
          <div className="chest-body">
            {chest.map((item, index) => (
              <div className="chest-item" key={index}>
                <p className="chest-price"><span>{item.name}</span><i><img src="images/ico_diamond.png" alt="" /></i></p>
                <a href="javascript:void(0)" onClick={() => buyChest(item.name, item.limited, mapEvenStatus(item.id,chestStatus))} className="btn-buy">
                  <span>mua ngay</span>
                  <label>{5-mapEvenStatus(item.id,chestStatus)}/{item.limited}</label>
                </a>
                <div className="chest-img">
                  <img src={item.avtar} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
