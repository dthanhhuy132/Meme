import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

import CommentForm from './Comment.Form';
import DotLoading from '../common/Loading/DotLoading';

import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('vi');
dayjs.extend(relativeTime);

export default function CommentItems({ postid, loadingComment, currentUser, userID, countCmtAddNew }) {
  const comments = useSelector(state => state.Comments.comments);
  const [isShowFormReply, setIsShowFormReply] = useState(false)
  const [isMatchComment, setIsMatchComment] = useState(false)


  const location = useLocation();

  const key = `postCmt-${postid}`
  const commentsForPostId = comments[key];
  const hasComment = commentsForPostId?.length > 0 ? true : false;

  let slugLink = currentUser?.USERID === userID ? '/profile' : `/user/${userID}`


  function handleOnclickReply() {
    setIsShowFormReply(!isShowFormReply)
  }


  return (
    <div className="ass1-comments" key={Math.random()}>
      {
        loadingComment || !commentsForPostId
          ? <DotLoading />
          : hasComment
            ? commentsForPostId?.map((comment, index) => {
              // console.log('index', index)
              const createdDate = dayjs(comment.time_added)
              const currentDate = dayjs();
              const relativeTimeStr = createdDate.from(currentDate);

              let avatar = comment.profilepicture !== '' ? comment.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'
              if (!avatar) avatar = currentUser?.profilepicture || comment.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg';
              let cmtFullName = comment.fullname
              if (!cmtFullName) cmtFullName = currentUser?.fullname || comment.fullname;

              return (
                <>
                  <div className="ass1-comments__section" key={comment.CID} >
                    <a href="/" className="ass1-comments__avatar ass1-avatar" onClick={e => e.preventDefault()}>
                      <img src={avatar} alt="" onClick={e => e.preventDefault()} />
                    </a>
                    <div className="ass1-comments__content">
                      <Link to={slugLink} className="ass1-comments__name" >{cmtFullName}</Link>
                      <span className="ass1-comments__passed">{relativeTimeStr}</span>
                      <i className="fas fa-reply dth-comment-reply" onClick={handleOnclickReply}></i>
                      <p>{comment.comment}</p>
                    </div>
                  </div>

                  {isShowFormReply &&
                    < div className='dth-comment-form-reply'>
                      <CommentForm currentUser={currentUser} postid={postid} countCmtAddNew={countCmtAddNew} ></CommentForm>
                    </div>
                  }
                </>
              )
            })
            :
            <div> Không có bình luận nào</div>
      }
    </div >
  )
}