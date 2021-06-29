import { useState } from "react";
import { useDispatch } from "react-redux";
import { actPostNewCommentAsync } from "../../store/comments/action";

export default function CommentForm({ currentUser, postid }) {
  const [cmtStr, setCmtStr] = useState('');
  let avatar = currentUser.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

  function handleChange(e) {
    e.preventDefault()
    setCmtStr(e.target.value)
  }
  // ___________________________________________________________________ Format comment form by comment.length
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

  // ___________________________________________________________________ Post New Comment
  const dispatch = useDispatch();

  function handleAddNewComment(e) {
    e.preventDefault();
    dispatch(actPostNewCommentAsync({
      comment: cmtStr,
      postid,
    }))
  }


  return (
    <div className="ass1-add-comment">
      <form action="#">
        <img src={avatar} alt=''></img>
        <textarea
          type="text"
          className="form-control ttg-border-none"
          placeholder="Thêm bình luận của bạn"
          value={cmtStr}
          onChange={handleChange}
        />
      </form>

      <div className="ass1-add-comment__content">
        <p>
          <span className={`warning-text-none ${color_red}`}>Vượt quá nội dung cho phép</span>
          <a href='/' className={`dth-btn-comment ${displayNone} ${btn_disable}`} onClick={handleAddNewComment}>Thêm bình luận</a>
        </p>
        <a href="/" className="ass1-add-comment__btn-save ass1-btn-icon ">
          <span className={color_red}>{countChar}</span>
          <i className={`far fa-check-circle ${color_red} ${color_green}`} ></i>
        </a>

      </div>
    </div >

  )
}