
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { actLogout, TOKEN_KEY, USER_ID } from '../../store/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// antdesign:
import { notification } from 'antd';

import Modal from '../Modal';
import ChangePassword from '../Author/ChangePassword';


export default function FooteResponsive({ toggleTheme, theme }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [headerModal, setHeaderModal] = useState('')
  // 1. Category
  function handleClickCategory(e) {
    e.preventDefault()
    let navCategory = document.querySelector('.dth-header-btn-category');
    navCategory.click()
  }

  // 5.2 ChangePassword
  const [isChangePassWord, setIsChangePassword] = useState(false)
  function handleClickChangePassWord(e) {
    setIsOpenModal(true);
    setIsChangePassword(true);
    setHeaderModal('Thay đổi mật khẩu')
  }
  // 5.3 Logout
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.Auth.currentUser)


  function handleClickLogout() {
    setIsOpenModal(true);
    setIsChangePassword(false);
    setHeaderModal('Đăng xuất thiệt hả Bro')
  }

  let body = document.querySelector('body');

  function handleLogout() {
    dispatch(actLogout())
    history.push('/')
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(TOKEN_KEY);
    setIsOpenModal(false);
    body.classList.remove('dth-modal-open');

    (function openNotification(placement) {
      notification.warning({
        message: `${placement}`,
        description: 'Hết bình luận và đăng ảnh nhé',
        className: 'dth-background-notification',
        duration: 3,
        closeIcon: <i className="fas fa-times"></i>,
        placement,
      })
    })(`Bái bai ${currentUser.fullname}`);
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }

  const iscurrentUser = currentUser ? true : false
  const disableClass = classNames({
    'dth-footer-disable': iscurrentUser === false
  })

  //_______________________________________________________  DarkMode
  function handleClickChangeDarkMode() {
    toggleTheme()
  }


  return (
    <>
      <footer>
        <div className='dth-footer'>
          <a href='/' onClick={handleClickCategory} className='dth-responsive-category'>
            <i className="fas fa-bars dth-header-btn-category dth-header-btn-category-icon"></i>
          </a>

          <a href='/' className='dth-responsive-search-icon' onClick={e => e.preventDefault()}>
            <i className="fas fa-search icon-Search"></i>
          </a>

          <Link to='/'>
            <i className="fas fa-home"></i>
          </Link>

          <Link to='/upload'>
            <i className="fas fa-upload dth-btn-upload-icon" />
          </Link>

          <a href='/' onClick={e => e.preventDefault()} className='dth-responsive-logout-icon'>
            <i className="fas fa-user-alt"></i>
          </a>
        </div>
        <div className='user-option-responsive'>
          <ul>
            <li onClick={handleClickChangeDarkMode}>


              {theme === 'light'
                ?
                <div className='responsive-interface-mode responsive-dark-mode'>
                  <div><i className="fas dth-far fa-moon"></i></div>
                  <p>Giao diện tối</p>
                </div>
                :
                <div className='responsive-interface-mode responsive-light-mode'>
                  <div><i className="fas dth-far fa-sun"></i></div>
                  <p>Giao diện sáng</p>
                </div>
              }


            </li>

            <li onClick={handleClickChangePassWord} className={disableClass}>
              <div><i className="fas dth-far fa-exchange-alt" ></i></div>
              <p>Đổi mật khẩu</p>
            </li>

            <li onClick={handleClickLogout} className={disableClass}>
              <div><i className="fas fa-sign-out-alt"></i></div>
              <p>Đăng xuất</p>
            </li >
          </ul >
        </div>

      </footer >
      {
        isOpenModal &&
        <Modal modalProps={modalProps} header={headerModal} isRenderFooter={!isChangePassWord} handleOnClickOKButton={handleLogout}>
          {
            isChangePassWord &&
            <ChangePassword></ChangePassword>
          }
        </Modal>
      }
    </>
  )
}