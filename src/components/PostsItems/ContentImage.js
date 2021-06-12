export default function ContentImage({
  postContent,
  postImage
}) {
  return (
    <div className="ass1-section__content">
      <p>{postContent}</p>
      <div className="ass1-section__image">
        <a href="bai-viet-chi-tiet.html"><img src={postImage} alt="" /></a>
      </div>
    </div>
  )
}