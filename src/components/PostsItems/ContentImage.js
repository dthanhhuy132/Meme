import { Link, useHistory, useLocation } from 'react-router-dom';

export default function ContentImage({
  postContent,
  postImage,
  postid,
  post
}) {

  const location = useLocation();
  const path = location.pathname;
  const history = useHistory();


  function handleClick(e) {
    e.preventDefault();
    if (path.indexOf('/post') !== -1) return null;
    else {
      history.push({
        pathname: postLink,
        post: post
      })
    }
  }


  const postLink = `/post/${postid}`
  return (
    <div className="ass1-section__content">
      <p>{postContent}</p>
      <div className="ass1-section__image">
        <a href='/' onClick={handleClick}><img src={postImage} alt="" /></a>
      </div>
    </div >
  )
}