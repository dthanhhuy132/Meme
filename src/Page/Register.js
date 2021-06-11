import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { actRegisterAsync } from "../store/auth/action";



export default function Register() {
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
              <h1>Đăng ký</h1>
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

              <div className="ass1-login__send">
                <Link to='/login'>Đăng nhập</Link>
                <Button isLoading={isLoading} onClick={handleClick}>Đăng ký</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main >
  )
}