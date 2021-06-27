import { useSelector } from "react-redux";
import DotLoading from '../common/Loading/DotLoading';



export default function CommentItems({ postid, loadingComment }) {
  const comments = useSelector(state => state.Comments.comments);
  // console.log('loadingComment truyen toi', loadingComment)



  const key = `postCmt-${postid}`
  const commentsForPostId = comments[key];

  const hasComment = commentsForPostId?.length > 0 ? true : false;
  // console.log('hasComment', hasComment)


  return (
    <div className="ass1-comments">
      {
        loadingComment
          ? <DotLoading />
          : hasComment
            ? commentsForPostId?.map((comment, index) => {
              const avatar = comment.profilepicture || 'http://img.thehobbyblogger.com/2012/08/custom-avatar.png'
              return (
                < div className="ass1-comments__section" key={index} >
                  <a href="/" className="ass1-comments__avatar ass1-avatar"><img src={avatar} alt="" /></a>
                  <div className="ass1-comments__content">
                    <a href="/" className="ass1-comments__name">{comment.fullname}</a>
                    <span className="ass1-comments__passed">12 giờ</span>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              )
            })
            :
            <div>Không có bình luận nào</div>
      }
    </div >
  )
}