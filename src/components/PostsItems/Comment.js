import { useSelector } from 'react-redux';

import CommentForm from './Comment.Form';
import CommentItems from './Comment.Items';

import DotLoading from '../common/Loading/DotLoading';
import { useState } from 'react';

import { motion } from 'framer-motion';

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

  const comments = useSelector(state => state.Comments.comments);
  const key = `postCmt-${postid}`
  const commentsForPostId = comments[key];
  let hasComment = commentsForPostId?.length > 0 ? true : false;

  const [hasNewComment, setHasNewComment] = useState(false);
  const [commentID, getCommentID] = useState('');


  return (
    <>
      {!currentUser
        ? <LoginComponet />
        : <CommentForm
          currentUser={currentUser}
          postid={postid}
          countCmtAddNew={countCmtAddNew}

          hasNewComment={hasNewComment}
          setHasNewComment={setHasNewComment}

          commentID={commentID}
          getCommentID={getCommentID}
        />
      }

      {loadingComment || !commentsForPostId
        ? <DotLoading />
        : hasComment
          ? (
            commentsForPostId.map((comment, index) => {
              return (
                (
                  < CommentItems
                    key={index}
                    postid={postid}

                    userID={comment.USERID}
                    comment={comment}

                    countCmtAddNew={countCmtAddNew}
                    hasNewComment={hasNewComment}
                    setHasNewComment={setHasNewComment}

                    commentID={commentID}
                    getCommentID={getCommentID}
                    commentIDforReplyCommentLevel2={comment.CID}

                    isParentComment={true}
                  />
                )
              )
            }))
          :
          <div className='dth-no-comment'> Không có bình luận nào</div>
      }
      <div className='comment-footer-space'></div>
    </>
  )
}