import { Link } from 'react-router-dom';

export default function ContentImage({
  postContent,
  postImage,
  postid
}) {

  const postLink = `/post/${postid}`
  return (
    <div className="ass1-section__content">
      <p>{postContent}</p>
      <div className="ass1-section__image">
        <Link to={{ pathname: postLink, imgDetail: postImage }}  ><img src={postImage} alt="" /></Link>
      </div>
    </div>
  )
}