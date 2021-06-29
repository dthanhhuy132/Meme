import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../common/Button";
import Input from "../common/Input";
import { actRegisterAsync } from "../../store/auth/action";



export default function Register({ handleRegister }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: 'Meme2@gmail.com',
    fullname: 'Meme2',
    password: 'Meme@132',
    repassword: 'Meme@132',
  })


  function handleClick() {
    setIsLoading(true)
    dispatch(
      actRegisterAsync(registerData)
    ).then(res => {
      if (res.ok === 'true') {
        console.log('tao tai khoan thanh cong')
      } else {
        console.log(res.ok)
      }
      setIsLoading(false)
    })
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
                onChange={(e) => setRegisterData({
                  ...registerData,
                  repassword: e.target.value
                })}
              />

              <div className="ass1-login__send dth-register-btn">
                <a href='/' onClick={handleRegister} className='btn-login-register'>Đăng nhập</a>
                <Button isLoading={isLoading} onClick={handleClick}>Đăng ký</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main >
  )
}