import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import HeaderSearch from './HeaderSearch';
import NavigationList from './NavigationList';
import Modal from '../Modal';
import Login from '../Author/Login';
import User from './User'

export default function Header() {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const [isOpenModal, setIsOpenModal] = useState(false)

  function handleOpenModal(e) {
    e.preventDefault()
    setIsOpenModal(true)
  }
  function closeModal() {
    setIsOpenModal(false)
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }

  console.log('isOpenModal', isOpenModal)

  return (
    <>
      <header>
        <div className="ass1-header">
          <div className="container">
            <Link to="/" className="ass1-logo">MEME</Link>
            <NavigationList />
            <HeaderSearch />
            <Link to="/upload" className="ass1-header__btn-upload ass1-btn btn-header"><i className="fas fa-upload" /> Upload</Link>
            {
              currentUser
                ?
                < User currentUser={currentUser} />
                :
                < a
                  href='/'
                  className="ass1-header__btn-upload ass1-btn"
                  onClick={handleOpenModal}
                ><i className="fas fa-user" />Login</a>
            }
            {
              isOpenModal &&
              <Modal modalProps={modalProps} isRenderFooter={false} closeModal={closeModal}>
                <Login closeModal={closeModal} setIsOpenModal={setIsOpenModal} currentUser={currentUser} />
              </Modal >
            }
          </div>
        </div>
      </header >
    </>
  )
}

