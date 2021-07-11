import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

import DotLoading from '../common/Loading/DotLoading';



export default function CommentItems({ postid, loadingComment, currentUser, userID }) {
  const comments = useSelector(state => state.Comments.comments);

  const location = useLocation();

  const key = `postCmt-${postid}`
  const commentsForPostId = comments[key];
  const hasComment = commentsForPostId?.length > 0 ? true : false;

  let slugLink = currentUser?.USERID === userID ? '/profile' : `/user/${userID}`


  return (
    <div className="ass1-comments">
      {
        loadingComment || !commentsForPostId
          ? <DotLoading />
          : hasComment
            ? commentsForPostId?.map((comment, index) => {
              let avatar = comment.profilepicture !== '' ? comment.profilepicture : 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'
              if (!avatar) avatar = currentUser?.profilepicture || comment.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg';
              let cmtFullName = comment.fullname
              if (!cmtFullName) cmtFullName = currentUser?.fullname || comment.fullname;
              return (
                < div className="ass1-comments__section" key={index} >
                  <a href="/" className="ass1-comments__avatar ass1-avatar" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="" onClick={e => e.preventDefault()} />
                  </a>
                  <div className="ass1-comments__content">
                    <Link to={slugLink} className="ass1-comments__name" >{cmtFullName}</Link>
                    <span className="ass1-comments__passed">12 giờ</span>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              )
            })
            :
            <div> Không có bình luận nào</div>
      }
    </div >
  )
}