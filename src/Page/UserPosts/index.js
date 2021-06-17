import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Masonry from 'react-masonry-css'

import { actFetchPostsByUserIdAsync } from '../../store/posts/action';
import { actGetUserInfoAsync, TOKEN_KEY } from '../../store/auth/action';

import Information from './Information';
import Post from '../../components/PostsItems';

export default function UserPosts() {
  const param = useParams();
  const dispatch = useDispatch();
  const history = useHistory()
  const userPosts = useSelector(state => state.Posts.userPosts.posts)
  const totalPosts = userPosts.length || 0;

  const slug = param.slug;

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) history.push('/login');

  useEffect(() => {
    dispatch(actFetchPostsByUserIdAsync(slug))
    dispatch(actGetUserInfoAsync(slug))
  }, [slug]);


  const breakpointColumnsObj = {
    default: totalPosts === 1 ? 1 : 2,
    1100: totalPosts === 1 ? 1 : 2,
    700: 1,
    500: 1
  };


  return (
    <main>
      <div className="container">
        <Information totalPosts={totalPosts} userId={slug} />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            userPosts?.map(userPost =>
              <Post
                key={userPost.PID}
                post={userPost}
                classCol='12'
              ></Post>)
          }
        </Masonry>

      </div>
    </main>
  )
}


