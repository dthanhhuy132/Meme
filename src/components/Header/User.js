import './UserStyle.css'
import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { actLogout, TOKEN_KEY, USER_ID } from '../../store/auth/action';

// import DarkMode from '../../hooks/useDarkMode'

// antdesign:
import { notification } from 'antd';

export default function User({ currentUser, handleClickChangePassWord, toggleTheme, theme }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const defaultAvatar = currentUser.profilepicture !== '' ? currentUser.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

  function handleClickShowSetting(e) {
    setIsOpenSetting(!isOpenSetting)
  }

  function handleClickProfile() {
    history.push('/profile')
  }

  useEffect(() => {
    function handleClickOutside(e) {
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
        duration: 0,
        closeIcon: <i className="fas fa-times"></i>,
        placement,
      })
    })(`Bái bai ${currentUser.fullname}`)
  }

  function clickChangePassword() {
    handleClickChangePassWord();
    setIsOpenSetting()
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

  // str.substr(0,str.indexOf(' '));
  let currUserName = currentUser?.fullname;
  let curruserNameDisplay = currentUser?.fullname.trim().indexOf(' ') === -1 ? currentUser?.fullname : currUserName.substring(0, currUserName.indexOf(' '));

  // ______________________________________________________________________________ Dark MODE
  // const { toggleTheme } = DarkMode();
  function handleClickChangeDarkMode() {
    toggleTheme()
  }

  let interfaceMode = classNames('interface-mode-wrapper', {
    'display-dark': theme === 'dark',
    'display-light': theme === 'light',
  })



  return (
    <div className={classLogin}>
      <div className='dth-user-login__img' onClick={handleClickProfile}>
        <img src={defaultAvatar} alt='' />
      </div>
      <div className='dth-user-login__text' >
        <p className={userNameInProfile} onClick={handleClickProfile}>{curruserNameDisplay}</p>
        <i className={classLoginIcon} onClick={handleClickShowSetting} />

        {
          isOpenSetting &&
          <ul className='user-setting__items dth-user-login__setting'>
            <li onClick={handleClickChangeDarkMode}>

              <div className={interfaceMode}>
                <div className='interface-mode light-mode'>
                  <div><i className="fas dth-far fa-sun"></i></div>
                  <p>Giao diện sáng</p>
                </div>

                <div className='interface-mode dark-mode'>
                  <div><i className="fas dth-far fa-moon"></i></div>
                  <p>Giao diện tối</p>
                </div>
              </div>

            </li>

            <li onClick={clickChangePassword}>
              <div><i className="fas dth-far fa-exchange-alt" ></i></div>
              <p>Đổi mật khẩu</p>
            </li>

            <li onClick={handleLogout}>
              <div><i className="fas fa-sign-out-alt"></i></div>
              <p>Đăng xuất</p>
            </li >
          </ul >
        }

      </div>
    </div >
  )
}