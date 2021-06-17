import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { actFetchCategoryPostsAsync } from "../../store/categories/actions";


import Post from '../../components/PostsItems';
import Button from '../../components/common/Button';
import UsePaging from "../../hooks/usePaging";

export default function CategoriesPage() {
  const param = useParams();
  const dispatch = useDispatch();


  const tagIndex = param.tagIndex;

  useEffect(() => {
    dispatch(actFetchCategoryPostsAsync({
      tagIndex
    })) // Test thu cho nay cho xoa
  }, [tagIndex])

  const {
    posts,
    handleLoadMore,
    isLoading
  } = UsePaging({
    extraParams: {
      tagIndex,
    },
    funcSelector: state => state.Categories.categoryPosts,
    actAsync: actFetchCategoryPostsAsync,
  })


  // if (!posts) return null;
  return (
    <main className='listPost'>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="ass1-section__list">
              {
                posts.map(post => (
                  <Post
                    key={post.PID}
                    post={post}
                  ></Post>
                ))
              }
            </div>
            <Button variant='loadmore' onClick={handleLoadMore} isLoading={isLoading}>Xem thêm</Button>
            {/* {displayLoadMore
                      ? <Button onClick={handleLoadMore} variant='loadmore' isLoading={isLoading}>XEM THÊM</Button>
                      : <Button variant='loadmore'>HẾT RỒI, KHÔNG TẢI ĐƯỢC NỮA</Button>
                  */}
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </main>
  )
}