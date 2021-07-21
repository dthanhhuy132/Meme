import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import CommentForm from './Comment.Form';

import CommentItem from './Comment.Items';



import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import useTimeCalculation from "../../hooks/useTimeCalculation";
import { ThemeContext } from '../../App.js'
import { actGetUserInfoAsync } from "../../store/auth/action";

dayjs.locale('vi');
dayjs.extend(relativeTime);

export default function CommentItems({
  postid,
  currentUser,
  userID,
  countCmtAddNew,
  comment,
  hasNewComment = true,

  setHasNewComment = () => { },

  commentID = '',
  getCommentID = () => { },
  isReplyComment = false,

  isParentComment = false,
}) {
  const dispatch = useDispatch();

  let slugLink = currentUser?.USERID === userID ? '/profile' : `/user/${userID}`
  const { relativeTimeStr } = useTimeCalculation(comment.time_added)

  let avatar = comment.profilepicture !== '' ? comment.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'
  if (!avatar) avatar = currentUser?.profilepicture || comment.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg';

  //_______________________________________________________________________________________Tach Comment;
  let [tagName, setTagName] = useState(null);
  let [tagNameId, setTagNameId] = useState(null);
  let [cmtReplyStr, setCmtReplyStr] = useState(null);

  const commentStr = comment?.comment;
  const replyCmt = commentStr?.indexOf('CodeCommentID-Start') !== -1;
  let idNe;
  useEffect(() => {
    if (replyCmt) {
      idNe = commentStr?.slice(0, commentStr.indexOf('CodeCommentID-Start'));
      dispatch(
        actGetUserInfoAsync(idNe)
      ).then(res => {
        if (res.ok) {
          setTagName(res.userData?.fullname);
        }
      })
    }
  }, [idNe])

  useEffect(() => {
    if (replyCmt) {
      setTagNameId(commentStr?.slice(0, 3));
      setCmtReplyStr(commentStr.slice(commentStr.indexOf('CodeCommentID-End') + 17, commentStr?.length))
    }
  }, [])


  const [fullNameAfterAddNewCmt, setFulllNameAfterAddNewCmt] = useState(null);
  useEffect(() => {
    if (comment.fullname) {
      setFulllNameAfterAddNewCmt(comment.fullname)
    } else {
      dispatch(
        actGetUserInfoAsync(comment.USERID)
      ).then(res => {
        if (res.ok) {
          setFulllNameAfterAddNewCmt(res?.userData?.fullname);
        }
      })
    }
  }, [comment])

  function renderTagName() {
    return (
      <a className='dth-tag-user' href='/' onClick={e => e.preventDefault()}>@{fullNameAfterAddNewCmt}</a>
    )
  }


  const theme = useContext(ThemeContext);
  let backgroundColorForNewComment = commentID === comment.CID
    ? theme === 'light'
      ? '#f8ff7f'
      : '#492828'
    : ''

  const placeholder = `Trả lời bình luận của ${comment.fullname}`;
  const motionVariant = !hasNewComment ? '' : {
    initial: {
      scale: 0.7,
      opacity: 0.5,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  // ______________________________________________________________________________ CommentReply
  const [showReplyComment, setShowReplyComment] = useState(false)
  const replyComment = useSelector(state => state.Comments.commentsReply);

  let replyCommentKey = `cmtReply-${postid}-${comment.CID}`;
  let commentsReplybyCommentID = replyComment[replyCommentKey];

  function handleClickShowReplyComment(e) {
    e.preventDefault();
    setShowReplyComment(!showReplyComment)
  }

  const [isShowFormReply, setIsShowFormReply] = useState(false)

  function handleOnclickReply(e, comment) {
    setIsShowFormReply(!isShowFormReply)
    setShowReplyComment(true)
  }

  return (
    <div className="ass1-comments" >

      <motion.div
        className="ass1-comments__section"
        variants={motionVariant}
        initial='initial'
        animate='animate'
        style={{ backgroundColor: `${backgroundColorForNewComment} `, transition: 'all 0.3s ease' }}
      >
        <a href="/" className="ass1-comments__avatar ass1-avatar" onClick={e => e.preventDefault()}>
          <img src={avatar} alt="" onClick={e => e.preventDefault()} />
        </a>
        <div className="ass1-comments__content">
          <Link to={slugLink} className="ass1-comments__name" >{comment?.fullname ? comment?.fullname : fullNameAfterAddNewCmt}</Link>
          <span className="ass1-comments__passed">{relativeTimeStr}</span>
          <i className="fas fa-reply dth-comment-reply" onClick={(e) => handleOnclickReply(e, comment)}></i>
          <div>
            {replyCmt && <Link to={currentUser?.USERID === tagNameId ? '/profile' : `user/${tagNameId}`} style={{ marginRight: '4px' }}>{tagName}</Link>}
            <p>{replyCmt ? cmtReplyStr : comment?.comment}</p>
          </div>
        </div>
      </motion.div>

      {isShowFormReply && currentUser &&
        <div className='dth-comment-form-reply only-form-comment'>
          <CommentForm
            currentUser={currentUser}
            postid={postid}
            countCmtAddNew={countCmtAddNew}

            setIsShowFormReply={setIsShowFormReply}
            setHasNewComment={setHasNewComment}

            commentID={!isReplyComment ? comment.CID : commentID}
            getCommentID={getCommentID}

            placeholder={placeholder}

            replyUser={fullNameAfterAddNewCmt}
            renderTagName={renderTagName}

            userID={comment.USERID}
          ></CommentForm>
        </div>
      }


      {
        commentsReplybyCommentID && isParentComment &&
        <div className='dth-comment-form-reply dth-comment-reply-item'>
          {
            !showReplyComment
              ?
              <a href='/' onClick={handleClickShowReplyComment} className='dth-comment-reply__btn-see-more'>Hiển thị các bình luận trả lời</a>
              :
              commentsReplybyCommentID.map(comment => {
                let commentParentID = comment.comment.slice(comment.comment.indexOf('CodeCommentID-Start') + 19, comment.comment.indexOf('CodeCommentID-End'))
                return (
                  <CommentItem
                    key={comment.CID}
                    comment={comment}

                    postid={postid}
                    currentUser={currentUser}

                    countCmtAddNew={countCmtAddNew}
                    hasNewComment={hasNewComment}
                    setHasNewComment={setHasNewComment}

                    getCommentID={getCommentID}
                    commentID={commentParentID}

                    isReplyComment={true}

                    isParentComment={false}
                  />
                )
              })
          }
        </div>
      }
    </div >
  )
}