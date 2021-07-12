import { useSelector } from 'react-redux';

import CommentForm from './Comment.Form';
import CommentItems from './Comment.Items';


export default function Comment({ postid, loadingComment, countCmtAddNew, userID }) {
  const currentUser = useSelector(state => state.Auth.currentUser);

  function handClickOpenLogin(e) {
    e.preventDefault()
    const LoginEl = document.querySelector('.dth-btn-login');
    LoginEl.click();
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
        : <CommentForm currentUser={currentUser} postid={postid} countCmtAddNew={countCmtAddNew} />
      }

      <CommentItems postid={postid} loadingComment={loadingComment} currentUser={currentUser} userID={userID} countCmtAddNew={countCmtAddNew}/>
      <div className='comment-footer-space'></div>
    </>
  )
}