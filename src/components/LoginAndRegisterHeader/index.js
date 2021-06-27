import './style.css';

export default function LoginAndRegisterHeader({
  handleRegister,
}) {

  return (
    <div className='tab-UI'>
      <p className='tab-UI__item login tab-UI-active' onClick={handleRegister}><i className="far fa-user-circle" ></i> Đăng nhập</p>
      <p className='tab-UI__item register' onClick={handleRegister}><i className="far fa-registered" ></i> Đăng ký</p>
      <div className='tab-UI__line'></div>
    </div>
  )
}