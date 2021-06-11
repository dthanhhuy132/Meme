import ContentImage from "./ContentImage";
import PostTime from "./PostTime";
import Author from "./Author";
import Avatar from "./Avartar";
import CmtStas from "./CmtStas";
import Button from '../common/Button';

import { useDispatch, useSelector } from "react-redux"
import { actFetchPostsAsync } from "../../store/posts/action";
import { useEffect, useState } from "react";

export default function Posts() {
  const {
    posts,
    pagesize,
    currPage
  } = useSelector(state => state.Posts.postPaging);
  const listPosts = posts.posts;
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();



  async function handleLoadMore() {
    // console.log('sau khi khong chay')
    if (isLoading) return;
    setIsLoading(true)
    await dispatch(actFetchPostsAsync({
      pagesize: pagesize + 7,
      currPage: currPage,
    }))
    setIsLoading(false)
    // setLengthAfter(listPosts.length)
    // // console.log('chay qua fetch data')

  }

  // Scroll to load more ---------------------------- START
  window.addEventListener('scroll', () => {
    if (!displayLoadMore) return;
    let body = document.querySelector('body');
    let bodyHeight = body.offsetHeight
    let windowScroll = window.scrollY;
    let windowHeight = window.innerHeight;

    let btnEl = document.querySelector('.loadmore-btn');
    if (bodyHeight === windowScroll + windowHeight) {
      if (btnEl) {
        btnEl.click()
      } else return;
    }
  })
  // Scroll to load more ---------------------------- END



  // Display button Loading More Start--------------- START
  const [displayLoadMore, setDisplayLoadMore] = useState(true)
  const [lengthBefore, setLengthBefore] = useState(3);
  const [lengthAfter, setLengthAfter] = useState(1);

  const length = listPosts || 2

  useEffect(() => {
    if (!listPosts) return;
    setLengthBefore(length.length);

  }, [listPosts, length.length])

  if (lengthAfter === lengthBefore) {
    console.log('run')
    setDisplayLoadMore(false)
  }

  // console.log('displayLoadMore', displayLoadMore)
  // console.log('lengthBefore', lengthBefore)
  // console.log('lengthAfter', lengthAfter)

  // Display button Loading More Start--------------- END

  if (!listPosts) {
    return null
  }

  return (
    <main className='listPost'>
      <div className="container">
        {/*sections*/}
        <div className="row">
          <div className="col-lg-8">
            <div className="ass1-section__list">
              <div className="ass1-section__item" >
                {
                  listPosts.map(listPost => {
                    const {
                      fullname,
                      PID,
                      profilepicture,
                      time_added,
                      post_content,
                      url_image,
                      count,
                      USERID
                    } = listPost

                    return (
                      <div className="ass1-section" key={PID}>
                        <div className="ass1-section__head">
                          <Avatar AvatarURL={profilepicture} userid={USERID} ></Avatar>
                          <div>
                            <Author userid={USERID}>{fullname}</Author>
                            <PostTime>{time_added}</PostTime>
                          </div>
                        </div>
                        <ContentImage postContent={post_content} postImage={url_image}></ContentImage>
                        <CmtStas>{count}</CmtStas>
                      </div>
                    )
                  })
                }
              </div>

              <Button onClick={handleLoadMore} variant='loadmore' isLoading={isLoading}>XEM THÊM</Button>
              {/* {
                displayLoadMore
                  ? <Button onClick={handleLoadMore} variant='loadmore' isLoading={isLoading}>XEM THÊM</Button>
                  : <Button variant='loadmore'>HẾT RỒI, KHÔNG TẢI ĐƯỢC NỮA</Button>
              } */}

            </div>
          </div>
        </div>
      </div>
    </main >
  )
}