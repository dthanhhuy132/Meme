import Input from '../common/Input';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actLoginAsync, USER_ID } from '../../store/auth/action';

import ButtonDth from '../common/Button';
import LoginAndRegisterHeader from '../Header/LoginAndRegisterHeader'
import Register from './Register';

// antdesign:
import { notification } from 'antd';

export default function Login({ setIsOpenModal, refreshPage = () => { } }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [saveLogin, setSaveLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isWarnText, setIsWarnText] = useState(false);

  const [formData, setFormData] = useState({
    email: 'Meme2@gmail.com',
    password: "Meme@132"
  });

  function handleSaveLogin() {
    setSaveLogin(!saveLogin)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }


  function handleSubmit(evt) {
    if (isLoading) return;
    evt.preventDefault()
    setIsLoading(true)
    dispatch(actLoginAsync(formData))
      .then(res => {
        let userName = res?.data?.user?.fullname || 'Friend'
        if (res.data.message === "Success!") {
          if (saveLogin) {
            const data = res.data;
            const userId = data.user.USERID
            userName = data.user.fullname
            localStorage.setItem(USER_ID, userId)
          };
          handleCloseModal();
          (function openNotification(placement) {
            notification.success({
              message: `${placement}`,
              description: "Cùng chế ảnh và bình luận truất'sssss nào",
              className: 'dth-background-notification',
              duration: 4,
              closeIcon: <i className="fas fa-times"></i>,
              placement,
            })
          })(`Ố, Hello ${userName} nhé!`);
          refreshPage()
        }

        else {
          (function openNotification(placement) {
            notification.error({
              message: `${placement}`,
              description: 'Xem lại Tài khoản hoặc mật khẩu cái nào!!!',
              className: 'dth-background-notification',
              duration: 4,
              closeIcon: <i className="fas fa-times"></i>,
              placement,
            })
          })('Ố ồ, đăng nhập thất bạiiiiii')
          setIsLoading(false);
          setIsWarnText(true);
        }
      })

  }

  function handleRegister() {
    // e.preventDefault();
    setIsRegister(!isRegister)
    let lineEl = document.querySelector('.tab-UI__line');
    let loginEl = document.querySelector('.login');
    let registerEl = document.querySelector('.register');

    if (isRegister) {
      lineEl.style.left = '0';
      loginEl.classList.add('tab-UI-active');
      registerEl.classList.remove('tab-UI-active');
      setIsRegister(!isRegister)
    } else {
      lineEl.style.left = '50%';
      loginEl.classList.remove('tab-UI-active');
      registerEl.classList.add('tab-UI-active');
      setIsRegister(!isRegister)
    }
  }

  function handleClickToRegister(e) {
    e.preventDefault();
    handleRegister()
  }

  return (
    <>
      <LoginAndRegisterHeader handleRegister={handleRegister} isRegister={isRegister} setIsRegister={setIsRegister} />
      {
        !isRegister
          ?
          <main>
            <div className="ass1-login">
              <div className="ass1-login__content">
                <div className="ass1-login__form">
                  <form onSubmit={handleSubmit} >
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(evt) => setFormData({
                        ...formData,
                        email: evt.target.value
                      })}
                      onInput={() => setIsWarnText(false)}
                    />
                    <Input
                      type="password"
                      className="form-control"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={(evt) => {
                        setFormData({
                          ...formData,
                          password: evt.target.value
                        })
                      }}
                      onInput={() => setIsWarnText(false)}
                    />
                    {isWarnText && <p class="text-danger dth-text-danger">Tên đăng nhập hoặc mật khẩu không chính xác</p>}
                    <div className='form-control form-checkbox'>
                      <input className='check-save' type='checkbox' checked={saveLogin} readOnly onClick={handleSaveLogin} />
                      <label className='check-label' onClick={handleSaveLogin} >Remember me</label>
                    </div>

                    <div className="ass1-login__send">
                      <a href='/' onClick={handleClickToRegister} className='btn-login-register'>Đăng ký tài khoản mới</a>
                      <ButtonDth onClick={handleSubmit} isLoading={isLoading}>Đăng nhập</ButtonDth>
                    </div>

                  </form>
                </div >
              </div >
            </div >
          </main >
          : <Register handleRegister={handleRegister} />
      }
    </>
  )
}