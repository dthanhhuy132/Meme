import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux';

import HeaderSearch from './HeaderSearch';
import NavigationList from './NavigationList';
import Modal from '../Modal';
import Login from '../Author/Login';
import User from './User';
import Upload from '../../Page/Upload'
import ChangePassword from '../Author/ChangePassword'
// antdesign:
import { notification } from 'antd';

export default function Header({ toggleTheme, theme }) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenModalChangePassword, setIsPOpenModalChangePassword] = useState(false)



  function handleOpenModal(e) {
    e.preventDefault()
    setIsOpenModal(true)
    setIsOpenLogin(true)
    setIsOpenUpload(false)
    setIsPOpenModalChangePassword(false)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  function handleOpenModalUpload(e) {
    e.preventDefault();

    if (!currentUser) {
      handleOpenModal(e);
      (function openNotification(placement) {
        notification.warning({
          message: `${placement}`,
          description: "Ahihi, hong biết bạn là ai sao cho đăng ảnh được",
          className: 'dth-background-notification',
          duration: 4.5,
          closeIcon: <i className="fas fa-times"></i>,
          placement,
        });
      })('Đăng nhập hoặc đăng ký trước bạn ơi')

    } else {
      setIsOpenModal(true)
      setIsOpenLogin(false)
      setIsOpenUpload(true)
      setIsPOpenModalChangePassword(false)

    }
  }

  function handleClickChangePassWord(e) {
    // e.preventDefault();
    setIsOpenModal(true);
    setIsPOpenModalChangePassword(true)
    setIsOpenLogin(false)
    setIsOpenUpload(false)
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }
  // ___________________________________________________ Scroll header
  let previousScrollTop = 0;
  window.addEventListener('scroll', function () {
    let currentScrollTop = window.scrollY;
    // Xử lý 
    if (currentScrollTop > previousScrollTop) {
      // Scroll Down 
      document.body.classList.add('scroll-down');
      document.body.classList.remove('scroll-up');
    } else if (currentScrollTop < previousScrollTop) {
      // Scroll Up
      document.body.classList.remove('scroll-down');
      document.body.classList.add('scroll-up');
    }

    // Trước khi return (Trước tầm vực hàm bị xoá bỏ)
    previousScrollTop = currentScrollTop;
  })

  return (
    <>
      <header>
        <div className="ass1-header">
          <div className="container">
            <Link to="/" className="ass1-logo">MEME</Link>
            <NavigationList />
            <HeaderSearch />
            <a href='/'
              className="ass1-header__btn-upload ass1-btn btn-header"
              onClick={handleOpenModalUpload}
              style={{ color: 'white' }}
            >
              <i className="fas fa-upload dth-btn-upload-icon" />
              <span className='dth-btn-upload-text'>Upload</span>
            </a>

            {
              currentUser
                ?
                < User currentUser={currentUser} handleClickChangePassWord={handleClickChangePassWord} toggleTheme={toggleTheme} theme={theme} />
                :
                < a
                  href='/'
                  className="ass1-btn dth-btn-login"
                  onClick={handleOpenModal}
                ><i className="fas fa-user" />Login</a>
            }

          </div>
        </div>
      </header >
      {
        isOpenModal && isOpenLogin &&
        < Modal modalProps={modalProps} isRenderFooter={false} closeModal={closeModal} header='Đăng nhập/Đăng ký'>
          <Login closeModal={closeModal} setIsOpenModal={setIsOpenModal} currentUser={currentUser} />
        </Modal >
      }
      {isOpenModal && isOpenUpload &&
        < Modal modalProps={modalProps} isRenderFooter={false} closeModal={closeModal} header='Đăng bài viết mới'>
          <Upload closeModal={closeModal}></Upload>
        </Modal>
      }
      {
        isOpenModal && isOpenModalChangePassword &&
        <Modal modalProps={modalProps} isRenderFooter={false} header='Thay đổi mật khẩu'>
          <ChangePassword setIsPOpenModalChangePassword={setIsPOpenModalChangePassword} />
        </Modal>
      }
    </>
  )
}

