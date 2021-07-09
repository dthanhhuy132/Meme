import { Link } from 'react-router-dom';

export default function ContentImage({
  postContent,
  postImage,
  postid,
  post
}) {

  const postLink = `/post/${postid}`
  return (
    <div className="ass1-section__content">
      <p>{postContent}</p>
      <div className="ass1-section__image">
        <Link to={{ pathname: postLink, post: post }}  ><img src={postImage} alt="" /></Link>
      </div>
    </div>
  )
}