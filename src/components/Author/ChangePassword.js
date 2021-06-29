import './ChangePassword.css'

import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../common/Button";
import Input from "../common/Input";
import { actChangePasswordAsync } from "../../store/auth/action";
import classNames from 'classnames';

// antdesign:
import { notification } from 'antd';

export default function ChangPassword({ setIsPOpenModalChangePassword }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
  })

  const [isError, setIsError] = useState(false)
  function handleClick() {
    setIsLoading(true)
    dispatch(
      actChangePasswordAsync({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        reNewPassword: formData.reNewPassword
      })
    ).then(res => {
      if (res.ok) {
        setIsPOpenModalChangePassword(false);
        setIsLoading(false);

        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Đừng quên mật khẩu nhé bro!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Thay đổi mật khẩu thành công')

      } else {
        setIsLoading(false);
        setIsError(true);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "Quên mật khẩu rồi sao bro?",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Thất bại!!!')
      }
    })
  }
  console.log('fromData', formData)
  const isMatchNewPassword = formData.newPassword !== '' && formData.newPassword === formData.reNewPassword && formData.oldPassword !== '';
  let ChangePasswordClass = classNames('ass1-login__send dth-register-btn dth-change-password-btn', {
    'dth-change-password-btn-disable': isMatchNewPassword === false
  })

  return (
    <main>
      <div className="ass1-login register-form">
        <div className="ass1-login__content ">
          <div className="ass1-login__form">
            <form >

              <Input
                className="form-control"
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={formData.oldPassword}
                onChange={(e) => setFormData({
                  ...formData,
                  oldPassword: e.target.value
                })}
                onInput={() => setIsError(false)}
              />
              {isError && <p className='changepass-err-message'>Mật khẩu sai rồi, nhập lại bạn ơi</p>}

              <Input
                className="form-control"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={formData.newPassword}
                onChange={(e) => setFormData({
                  ...formData,
                  newPassword: e.target.value
                })}
              />

              <Input
                className="form-control"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={formData.reNewPassword}
                onChange={(e) => setFormData({
                  ...formData,
                  reNewPassword: e.target.value
                })}
              />

              <div className={ChangePasswordClass}>
                <Button isLoading={isLoading} onClick={handleClick}>Thay đổi mật khẩu</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main >
  )
}