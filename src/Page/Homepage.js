
import Post from '../components/PostsItems';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchPostsAsync } from '../store/posts/action';
import { actFechMeInfoAsync, USER_ID } from '../store/auth/action';
import Button from '../components/common/Button'

export default function Homepage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    dispatch(actFetchPostsAsync())
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));
    // eslint-disable-next-line
  }, [])



  const {
    posts,
    pagesize,
    currPage
  } = useSelector(state => state.Posts.postPaging);
  const listPosts = posts.posts


  async function handleLoadMore(e) {
    e.preventDefault()
    // console.log('sau khi khong chay')
    if (isLoading) return;
    setIsLoading(true)
    await dispatch(actFetchPostsAsync({
      pagesize: pagesize + 7,
      currPage: currPage,
    }))
    setIsLoading(false)
  }

  return (
    <main className='listPost'>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ass1-section__list">
              {/* <Post></Post> */}
            </div>
            <Button variant='loadmore' onClick={handleLoadMore} isLoading={isLoading}>Xem thêm</Button>
            //className="load-more ass1-btn"
            {/* {displayLoadMore
                      ? <Button onClick={handleLoadMore} variant='loadmore' isLoading={isLoading}>XEM THÊM</Button>
                      : <Button variant='loadmore'>HẾT RỒI, KHÔNG TẢI ĐƯỢC NỮA</Button>
                  */}
          </div>
        </div>
      </div>
    </main >
  )
}