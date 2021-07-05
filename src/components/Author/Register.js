import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../common/Button";
import Input from "../common/Input";
import { actRegisterAsync } from "../../store/auth/action";

// antdesign:
import { notification } from 'antd';

export default function Register({ handleRegister }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: 'Meme2@gmail.com',
    fullname: 'Meme2',
    password: 'Meme@132',
    repassword: 'Meme@132',
  })

  function handleClickToLogin(e) {
    e.preventDefault();
    handleRegister();
  }


  function handleClick() {
    if (registerData.password !== registerData.repassword) {
      setIsWarning(true)
    }
    else {
      setIsLoading(true)
      dispatch(
        actRegisterAsync(registerData)
      ).then(res => {
        if (res.ok === 'true') {
          (function openNotification(placement) {
            notification.success({
              message: `${placement}`,
              description: "Đăng nhập lại để cùng chế ảnh",
              className: 'dth-background-notification',
              duration: 4,
              closeIcon: <i className="fas fa-times"></i>,
              placement,
            });
            setIsLoading(false)
            handleRegister();
          })('Đăng ký thành công');
        } else {
          (function openNotification(placement) {
            notification.error({
              message: `${placement}`,
              description: `${res.error}`,
              className: 'dth-background-notification',
              duration: 4,
              closeIcon: <i className="fas fa-times"></i>,
              placement,
            })
          })('Đăng ký thất bại');
          setIsLoading(false)

        }
      })
    }

  }


  return (
    <main>
      <div className="ass1-login register-form">
        <div className="ass1-login__content ">
          <div className="ass1-login__form">
            <form >
              <Input
                className="form-control"
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  email: e.target.value
                })}
              />

              <Input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={registerData.fullname}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  fullname: e.target.value
                })}
              />

              <Input
                className="form-control"
                type="password"
                placeholder="Mật khẩu"
                value={registerData.password}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  password: e.target.value
                })}
              />

              <Input
                className="form-control"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={registerData.repassword}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    repassword: e.target.value
                  });
                  setIsWarning(false)
                }}
              />
              {isWarning && <p className='warning-text'>Mật khẩu nhập lại không đúng</p>}
              <div className="ass1-login__send dth-register-btn">
                <a href='/' onClick={handleClickToLogin} className='btn-login-register'>Đăng nhập</a>
                <Button isLoading={isLoading} onClick={handleClick}>Đăng ký</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main >
  )
}