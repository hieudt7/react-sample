import React from 'react'
import {showErrorWithCode} from './common'
export default ({children, show, closeHandler,customClass,errorCode}) =>
<React.Fragment>
  <div className={`modal ${show ? 'show' : ''} ${customClass ? customClass : ''}`}>
    <div className="modal-dialog animated fadeInDown">
      <div className="modal-content">
        <div className="modal-body">
          {children}
        </div>
      </div>
      <img src="images/pop_ic_1.png" alt="" className="pop_1"/>
      <img src="images/pop_ic_2.png" alt="" className="pop_2"/>
      <img src="images/pop_ic_3.png" alt="" className="pop_3"/>
      <img src="images/pop_ic_4.png" alt="" className="pop_4"/>
    </div>
    <div onClick={closeHandler} className={`modal-backdrop animated fade ${show ? 'show' : ''}`}></div>
  </div>
</React.Fragment>