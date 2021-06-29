import { useSelector } from 'react-redux';

import CommentForm from './Comment.Form';
import CommentItems from './Comment.Items';
import Modal from '../Modal';
import Login from '../Author/Login';
import { useState } from 'react';

export default function Comment({ postid, loadingComment }) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const [isOpenModal, setIsOpenModal] = useState(false);


  function handClickOpenLogin(e) {
    e.preventDefault()
    setIsOpenModal(true)
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }

  function closeModal() {
    setIsOpenModal(false)
  }
  const LoginComponet = () => (
    <div className='comment-login'>Vui lòng
      <a href='/' onClick={handClickOpenLogin}> Đăng nhập/Đăng ký </a>
      để bình luận
    </div>
  )

  return (
    <>
      {!currentUser
        ? <LoginComponet />
        : <CommentForm currentUser={currentUser} postid={postid} />
      }

      <CommentItems postid={postid} loadingComment={loadingComment} currentUser={currentUser} />
      <div className='comment-footer-space'></div>
      {
        isOpenModal &&
        <Modal modalProps={modalProps} isRenderFooter={false} closeModal={closeModal}>
          <Login closeModal={closeModal} setIsOpenModal={setIsOpenModal} currentUser={currentUser} />
        </Modal >
      }
    </>
  )
}