import Input from '../components/common/Input';

import { useHistory } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actLoginAsync, USER_ID, TOKEN_KEY } from '../store/auth/action';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';




export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [saveLogin, setSaveLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: 'Meme2@gmail.com',
    password: "Meme@132"
  });

  function handleSubmit(evt) {
    evt.preventDefault()
    setIsLoading(true)
    dispatch(actLoginAsync(formData))
      .then(res => {
        if (res.ok) {
          if (saveLogin) {
            const data = res.data;
            const userId = data.user.USERID
            localStorage.setItem(USER_ID, userId)
          }

          history.goBack()
          setIsLoading(false)
        }

        else alert('Email or Password wrong')
      })
  }

  function handleSaveLogin() {
    setSaveLogin(!saveLogin)
  }

  return (
    <main>
      <div className="ass1-login">
        <div className="ass1-login__content">
          <div className="ass1-login__form">
            <form onSubmit={handleSubmit} >
              <h1>Đăng nhập</h1>
              <Input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(evt) => setFormData({
                  ...formData,
                  email: evt.target.value
                })}
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
              />

              <div className='form-control form-checkbox'>
                <input className='check-save' type='checkbox' checked={saveLogin} readOnly />
                <label className='check-label' onClick={handleSaveLogin} >Remember me</label>
              </div>


              <div className="ass1-login__send">
                <Link to='/register'>Đăng ký</Link>
                <Button onClick={handleSubmit} isLoading={isLoading}>Đăng nhập</Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main >
  )
}