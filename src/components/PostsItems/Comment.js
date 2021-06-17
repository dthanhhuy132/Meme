import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import CommentForm from './Comment.Form';
import CommentItems from './Comment.Items';

export default function Comment({ postid, loadingComment }) {
  const currentUser = useSelector(state => state.Auth.currentUser);

  const LoginComponet = () => (
    <div className='comment-login'>Vui lòng
      <Link to='/login'> Đăng nhập </Link>
      hoặc
      <Link to='/register'> Đăng ký </Link>
      để bình luận
    </div>
  )

  return (
    <>
      {!currentUser
        ? <LoginComponet />
        : <CommentForm />
      }

      <CommentItems postid={postid} loadingComment={loadingComment} />
      <div className='comment-footer-space'></div>
    </>
  )
}