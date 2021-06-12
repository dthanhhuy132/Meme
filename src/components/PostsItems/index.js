import ContentImage from "./ContentImage";
import PostTime from "./PostTime";
import Author from "./Author";
import Avatar from "./Avartar";
import CmtStas from "./CmtStas";

export default function Posts({
  post,
} = {}) {

  // const {
  //   fullname,
  //   PID,
  //   profilepicture,
  //   time_added,
  //   post_content,
  //   url_image,
  //   count,
  //   USERID
  // } = post

  // Scroll to load more ---------------------------- START
  // window.addEventListener('scroll', () => {
  //   let body = document.querySelector('body');
  //   let bodyHeight = body.offsetHeight
  //   let windowScroll = window.scrollY;
  //   let windowHeight = window.innerHeight;

  //   let btnEl = document.querySelector('.loadmore-btn');
  //   if (bodyHeight === windowScroll + windowHeight) {
  //     if (btnEl) {
  //       btnEl.click()
  //     } else return;
  //   }
  // })
  // Scroll to load more ---------------------------- END



  // Display button Loading More Start--------------- START
  // const [displayLoadMore, setDisplayLoadMore] = useState(true)
  // const [lengthBefore, setLengthBefore] = useState(3);
  // const [lengthAfter, setLengthAfter] = useState(1);

  // const length = listPosts || 2

  // useEffect(() => {
  //   if (!listPosts) return;
  //   setLengthBefore(length.length);

  // }, [listPosts, length.length])

  // if (lengthAfter === lengthBefore) {
  //   console.log('run')
  //   setDisplayLoadMore(false)
  // }

  // console.log('displayLoadMore', displayLoadMore)
  // console.log('lengthBefore', lengthBefore)
  // console.log('lengthAfter', lengthAfter)

  // Display button Loading More Start--------------- END

  if (!post) {
    return null
  }

  return (
    <>
    </>
    //<div className="ass1-section__item" key={PID}>
    // <div className="ass1-section" >
    //   <div className="ass1-section__head">
    //     <Avatar AvatarURL={profilepicture} userid={USERID} ></Avatar>
    //     <div>
    //       <Author userid={USERID}>{fullname}</Author>
    //       <PostTime>{time_added}</PostTime>
    //     </div>
    //   </div>
    //   <ContentImage postContent={post_content} postImage={url_image}></ContentImage>
    //   <CmtStas>{count}</CmtStas>
    // </div>
    // </div>
  )
}