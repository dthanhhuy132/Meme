import InfiniteScroll from 'react-infinite-scroll-component';

import UsePaging from '../../hooks/usePaging';
import Post from '../../components/PostsItems';
import DotLoading from '../../components/common/Loading/DotLoading';

export default function MainPost() {

  const {
    posts,
    handleLoadMore,
    postsLength
  } = UsePaging();

  // console.log('post trong Mainpage', posts)

  let hasLoadingMore = true
  if (postsLength === 0) hasLoadingMore = false

  return (
    <div className="col-lg-8">
      <div className="ass1-section__list">
        <InfiniteScroll
          dataLength={posts.length}
          next={handleLoadMore}
          hasMore={hasLoadingMore}
          loader={<div className='dth-infinity-scroll'>
            <DotLoading />
          </div>
          }
          // scrollThreshold={1}
          endMessage={
            <p className='dth-infinity-scroll-endMessage'>
              <b>HẾT RỒI HYHY</b>
            </p>
          }
        >
          {
            posts.map(post => (
              <Post
                key={post.PID}
                post={post}
              ></Post>
            ))
          }
        </InfiniteScroll>
      </div>

      {/* <Button variant='loadmore' onClick={handleLoadMore} isLoading={isLoading}>Xem thêm</Button> */}
    </div>
  )
}