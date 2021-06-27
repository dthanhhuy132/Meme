import { useLocation } from "react-router";
import queryString from 'query-string'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actSearchPostAsync } from "../../store/posts/action";

import Post from '../../components/PostsItems';
import DotLoading from '../../components/common/Loading/DotLoading'

export default function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)
  const cmtStr = queryString.parse(location.search).q;

  const searchPosts = useSelector(state => state.Posts.searchPosts);
  console.log('searchPosts', searchPosts)

  useEffect(() => {
    setIsLoading(true)
    dispatch(
      actSearchPostAsync(cmtStr)
    ).then(res => {
      setIsLoading(false)
    })

  }, [cmtStr, dispatch])


  return (
    <main className='listPost'>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>

          <div className="col-lg-8 search-page">
            {
              isLoading
                ?
                <div className='count-posts'>
                  <DotLoading />
                </div>
                :
                <>
                  <div className='count-posts'>Có {searchPosts?.length} bài viết liên quan</div>
                  <div className="ass1-section__list">
                    {
                      searchPosts.map(post => (
                        <Post
                          key={post.PID}
                          post={post}
                        ></Post>
                      ))
                    }
                  </div>
                </>
            }


          </div>

          <div className="col-lg-2"></div>
        </div>
      </div >
    </main >

  )
}