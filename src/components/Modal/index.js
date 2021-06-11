import { useState } from "react"
import './style.css'


export default function Modal({
  children,
  header,

}) {
  const [isVisible, setIsVisible] = useState(false)
  function handleCancel() {


  }
  return (
    < div className='modal-wrapper'>
      <div className='dth-mask' onClick={handleCancel} ></div>
      <div className='dth-modal-content'>
        <h3 className='dth-modal-header'>Đăng nhập</h3>
        <div className='dth-modal-body'>{children}</div>
        <div className='dth-modal-footer'>

        </div>
      </div>
    </div>
  )
}