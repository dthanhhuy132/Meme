import './UserStyle.css'
import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { actLogout, TOKEN_KEY, USER_ID } from '../../store/auth/action';

import Modal from '../Modal';
import ChangePassword from '../Author/ChangePassword'
// antdesign:
import { notification } from 'antd';

export default function User({ currentUser }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const defaultAvatar = currentUser.profilepicture !== '' ? currentUser.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalChangePassword, setIsPOpenModalChangePassword] = useState(false)


  function handleClickShowSetting(e) {
    setIsOpenSetting(!isOpenSetting)
  }

  function handleClickProfile() {
    history.push('/profile')
  }

  let classLogin = classNames('dth-user-login', {
    'dth-user-login-active': isOpenSetting === true,
    'dth-user-profile-page': location.pathname === '/profile'
  })
  let classLoginIcon = classNames('fas dth-fa-user__icon fa-chevron-right', {
    'userSettingOpen': isOpenSetting === true
  })
  let userNameInProfile = classNames({
    'dth-user-login__text-in-profile': location.pathname === '/profile'
  })

  useEffect(() => {
    function handleClickOutside(e) {
      // console.log(e.target.className)


      if (
        e.target.className !== 'dth-user-login__setting'
        && e.target.className !== ''
        && e.target.className !== 'fas dth-fa-user__icon fa-chevron-right userSettingOpen'
        // || e.target.className !== ''
      ) setIsOpenSetting(false);
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [])

  function handleLogout() {
    dispatch(actLogout())
    history.push('/')
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(TOKEN_KEY);

    (function openNotification(placement) {
      notification.warning({
        message: `${placement}`,
        description: 'Hết bình luận và đăng ảnh nhé',
        className: 'dth-background-notification',
        duration: 2,
        closeIcon: <i className="fas fa-times"></i>,
        placement,
      })
    })(`Bái bai ${currentUser.fullname}`)
  }

  function handleClickChangePassWord(e) {
    e.preventDefault();
    setIsOpenModal(true);
    setIsPOpenModalChangePassword(true)
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }


  return (
    <div className={classLogin}>
      <div className='dth-user-login__img' onClick={handleClickProfile}>
        <img src={defaultAvatar} alt='' />
      </div>
      <div className='dth-user-login__text' >
        <p className={userNameInProfile} onClick={handleClickProfile}>{currentUser?.fullname}</p>
        <i className={classLoginIcon} onClick={handleClickShowSetting} />

        {
          isOpenSetting &&
          <ul className='user-setting__items dth-user-login__setting'>
            <li>
              <div><i className="far dth-far fa-trash-alt"></i></div>
              <p>Giao diện tối</p>
            </li>

            <li onClick={handleClickChangePassWord}>
              <div><i className="far dth-far fa-trash-alt" ></i></div>
              <p>Đổi mật khẩu</p>
            </li>

            <li onClick={handleLogout}>
              <div><i className="far dth-far fa-eye-slash"></i></div>
              <p>Đăng xuất</p>
            </li >
          </ul >
        }
        {
          isOpenModal && isOpenModalChangePassword &&
          <Modal modalProps={modalProps} isRenderFooter={false} header='Thay đổi mật khẩu'>
            <ChangePassword setIsPOpenModalChangePassword={setIsPOpenModalChangePassword} />
          </Modal>
        }
      </div>
    </div>
  )
}