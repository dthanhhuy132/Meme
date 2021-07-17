import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import CommentForm from './Comment.Form';


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
  hasNewComment,
  setHasNewComment = () => { },

  commentID,
  getCommentID = () => { }

}) {
  const dispatch = useDispatch();

  const [isShowFormReply, setIsShowFormReply] = useState(false)
  const location = useLocation();

  let slugLink = currentUser?.USERID === userID ? '/profile' : `/user/${userID}`
  const { relativeTimeStr } = useTimeCalculation(comment.time_added)

  let avatar = comment.profilepicture !== '' ? comment.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'
  if (!avatar) avatar = currentUser?.profilepicture || comment.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg';
  let cmtFullName = comment.fullname
  if (!cmtFullName) cmtFullName = currentUser?.fullname || comment.fullname;


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


  //_______________________________________________________________________________________Tach Comment;
  let [tagName, setTagName] = useState(null);
  let [tagNameId, setTagNameId] = useState(null);
  const commentStr = comment?.comment

  useEffect(() => {
    if (commentStr?.indexOf('###---###') !== -1 && commentStr?.indexOf('$$$---$$$' && comment.fullname) !== -1) {
      setTagName(commentStr?.slice(0, commentStr?.indexOf('###---###')));
      setTagNameId(commentStr?.slice(commentStr?.indexOf('###---###') + 9, commentStr?.indexOf('$$$---$$$')))
    }
  }, [])

  const [fullNameAfterAddNewCmt, setFulllNameAfterAddNewCmt] = useState(null)
  useEffect(() => {
    if (!comment.fullname) {
      dispatch(
        actGetUserInfoAsync(comment.USERID)
      ).then(res => {
        if (res.ok) {
          setFulllNameAfterAddNewCmt(res.userData.fullname);
        }
      })
    }
  }, [])

  console.log('fullNameAfterAddNewCmt', fullNameAfterAddNewCmt)
  console.log('in ra comment', comment)


  // console.log('tagName', tagName)
  // console.log('tagNameId', tagNameId)

  function handleClickOnTagName(e) {
    e.preventDefault();
    // history.push()



  }






  const theme = useContext(ThemeContext);

  function handleOnclickReply() {
    setIsShowFormReply(!isShowFormReply)
  }

  function renderTagName() {
    return (
      <a className='dth-tag-user' href='/' onClick={handleClickOnTagName}>@{tagName ? tagName : fullNameAfterAddNewCmt ? fullNameAfterAddNewCmt : comment.fullname}</a>
    )
  }



  let backgroundColorForNewComment = commentID === comment.CID
    ? theme === 'light'
      ? '#f8ff7f'
      : '#492828'
    : ''

  const placeholder = `Trả lời bình luận của ${comment.fullname}`;

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
          <Link to={slugLink} className="ass1-comments__name" >{cmtFullName}</Link>
          <span className="ass1-comments__passed">{relativeTimeStr}</span>
          <i className="fas fa-reply dth-comment-reply" onClick={handleOnclickReply}></i>
          <div>
            <Link to=''>á à</Link>
            <p>{comment.comment}</p>
          </div>
        </div>
      </motion.div>

      {isShowFormReply &&
        < div className='dth-comment-form-reply'>
          <CommentForm
            currentUser={currentUser}
            postid={postid}
            countCmtAddNew={countCmtAddNew}

            setIsShowFormReply={setIsShowFormReply}
            setHasNewComment={setHasNewComment}

            commentID={commentID}
            getCommentID={getCommentID}

            placeholder={placeholder}

            replyUser={tagName ? tagName : fullNameAfterAddNewCmt ? fullNameAfterAddNewCmt : comment.fullname}
            renderTagName={renderTagName}

            userID={userID}

          ></CommentForm>


        </div>
      }
    </div >
  )
}