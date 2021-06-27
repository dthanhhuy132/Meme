import { useState } from "react";

export default function CommentForm() {

  const [cmtStr, setCmtStr] = useState('');

  function handleChange(e) {
    e.preventDefault()
    setCmtStr(e.target.value)
  }

  const commentLength = cmtStr.length;
  // console.log(commentLength)



  let color_red = '';
  let color_green = '';
  let displayNone = '';

  if (commentLength > 0 && commentLength <= 100) {
    color_green = 'color-green';
  } if (commentLength > 100) {
    displayNone = 'dth-btn-comment-none';
    color_red = 'color-red'
  }

  const countChar = commentLength === 0 ? '100' : `${commentLength}/100`;





  return (
    <div className="ass1-add-comment">
      <form action="#">
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
          <a href='/' className={`dth-btn-comment ${displayNone}`}>Thêm bình luận</a>
        </p>
        <a href="/" className="ass1-add-comment__btn-save ass1-btn-icon ">
          <span className={color_red}>{countChar}</span>
          <i className={`far fa-check-circle ${color_red} ${color_green}`} ></i>
        </a>

      </div>
    </div>

  )
}