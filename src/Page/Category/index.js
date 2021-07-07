import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { actFetchCategoryPostsAsync } from "../../store/categories/actions";

import Post from '../../components/PostsItems';
import UsePaging from "../../hooks/usePaging";
import DotLoading from '../../components/common/Loading/DotLoading';

export default function CategoriesPage() {
  const param = useParams();

  const dispatch = useDispatch();
  const tagIndex = param.tagIndex;

  useEffect(() => {
    dispatch(actFetchCategoryPostsAsync({
      tagIndex
    })) // Test thu cho nay cho xoa
    // eslint-disable-next-line
  }, [tagIndex])

  const {
    posts,
    handleLoadMore,
    postsLength
  } = UsePaging({
    extraParams: {
      tagIndex,
    },
    funcSelector: state => state.Categories.categoryPosts,
    actAsync: actFetchCategoryPostsAsync,
  })

  console.log('posts trong Category', posts)


  let hasLoadingMore = true
  if (postsLength === 0) hasLoadingMore = false


  // if (!posts) return null;
  return (
    <main className='listPost'>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="ass1-section__list">
              <InfiniteScroll
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={hasLoadingMore}
                loader={<div style={{ marginBottom: '25px' }}>
                  <DotLoading />
                </div>
                }
                // scrollThreshold={1}
                endMessage={
                  <p style={{ textAlign: 'center', marginBottom: '25px', fontSize: '20px', fontWeight: '400' }}>
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
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </main>
  )
}