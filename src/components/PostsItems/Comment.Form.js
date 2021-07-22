import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actPostNewCommentAsync } from "../../store/comments/action";
import Loading from '../common/Loading'

// antdesign:
import { notification } from 'antd';
// import { MentionsInput, Mention } from 'react-mentions'
// import { Link } from "react-router-dom";
// OK het roi

export default function CommentForm({
  currentUser,
  postid,
  countCmtAddNew,
  setIsShowFormReply = () => { },

  setHasNewComment = () => { },

  getCommentID = () => { },

  replyUser = '',
  placeholder = 'Thêm bình luận của bạn',

  renderTagName = null,

  userID = '',
  commentID = ''
}) {


  const [cmtStr, setCmtStr] = useState(' ');
  // if (replyUser === '') setCmtStr('')
  let avatar = currentUser?.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

  // ________________________________________________________________________________ Format comment form by comment.length
  function handleChange(e) {
    const textInput = e.target.value
    setCmtStr(textInput)
  }

  // ________________________________________________________________________________ Format comment form by comment.length
  const commentLength = cmtStr.length;
  let color_red = '';
  let color_green = '';
  let displayNone = '';
  let btn_disable = ''

  if (commentLength > 0 && commentLength <= 100) {
    color_green = 'color-green';
  } else if (commentLength > 100) {
    displayNone = 'dth-btn-comment-none';
    color_red = 'color-red'
  } else if (commentLength === 0) btn_disable = 'dth-btn-comment-disable'
  const countChar = commentLength === 0 ? '100' : `${commentLength}/100`;



  //_____________________________________________________________________________________ Input set textarea height and delete tagUserName
  const textAreaEls = document.querySelectorAll('.ass1-add-comment textarea');
  function handleOnInput() {
    textAreaEls.forEach(textAreaEl => {
      textAreaEl.style.height = 'auto';
      textAreaEl.style.height = textAreaEl.scrollHeight + 'px';
    })
  }

  // _____________________________________________________________________________________ Focus to remove placeholder

  const [displayRenderTagUser, setDisplayTagUser] = useState(true);
  const [textIndentForCmt, setTextIndentForCmt] = useState('');

  function handleOnFocus(e) {
    const textAreaReplyE = e.target;
    const tagUserNameEl = textAreaReplyE.previousSibling;
    if (renderTagName && displayRenderTagUser) setTextIndentForCmt(tagUserNameEl.clientWidth + 1 + 'px')
  }

  //_______________________________________________________________________________________ Delete Display tag user name

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if
        (e.key === 'Backspace'
        && e.target.className === "form-control ttg-border-none"
        && e.target.localName === 'textarea'
        && cmtStr === ''
        && replyUser !== ''
      ) {
        console.log('ua sao tu nhien chay luon day')
        setDisplayTagUser(false)
        setTextIndentForCmt('')
      }
    })
    // eslint-disable-next-line
  }, [cmtStr])

  // _____________________________________________________________________________________ Post New Comment
  function changeBackgroundCmt() {
    setTimeout(() => {
      getCommentID('')
    }, 5000)
  }

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  function handleAddNewComment(e) {
    e.preventDefault();
    setIsLoading(true)
    setHasNewComment(true);

    dispatch(actPostNewCommentAsync({
      comment: replyUser !== ''
        ? displayRenderTagUser
          ? userID + 'CodeCommentID-Start' + commentID + 'CodeCommentID-End' + cmtStr
          : 'CodeCommentID-Start' + commentID + 'CodeCommentID-End' + cmtStr
        : cmtStr,
      postid,
    })).then(res => {
      if (res.ok) {
        countCmtAddNew();
        setIsLoading(false);
        setCmtStr('');
        setIsShowFormReply(false);
        getCommentID(res.cmtId)
        changeBackgroundCmt();
      } else {

        setIsLoading(false);
        setHasNewComment(false);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "Vui lòng không bình luận nữa=))",
            className: 'dth-background-notification',
            duration: 4,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Bình luận thất bại')
      }
    })
  }

  //_______________________________________________________________________________________ Return JSX
  return (
    <div className="ass1-add-comment">
      <form action="#">
        <img src={avatar} alt=''></img>
        {displayRenderTagUser && renderTagName && renderTagName()}
        <textarea
          style={{ textIndent: `${textIndentForCmt}` }}
          type="text"
          row='5'
          className="form-control ttg-border-none"
          placeholder={!renderTagName ? placeholder : ''}
          value={replyUser === '' ? cmtStr.trimStart() : cmtStr}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onInput={handleOnInput}
        />
      </form>


      <div className="ass1-add-comment__content">
        <p>
          <span className={`warning-text-none ${color_red}`}>Vượt quá nội dung cho phép</span>
          <a href='/' className={`dth-btn-comment ${displayNone} ${btn_disable}`} onClick={handleAddNewComment}>
            {isLoading && <Loading />}
            Thêm bình luận
          </a>
        </p>
        <a href="/" className="ass1-add-comment__btn-save ass1-btn-icon ">
          <span className={color_red}>{countChar}</span>
          <i className={`far fa-check-circle ${color_red} ${color_green}`} ></i>
        </a>

      </div>
    </div >

  )
}