import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Masonry from 'react-masonry-css'

import { actFetchPostsByUserIdAsync } from '../../store/posts/action';
import { actGetUserInfoAsync, TOKEN_KEY } from '../../store/auth/action';

import Information from './Information';
import Post from '../../components/PostsItems';
import { useState } from 'react';

export default function UserPosts() {
  const param = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) history.push('/login');

  const currentUser = useSelector(state => state.Auth.currentUser);
  const userID = currentUser?.USERID;

  const slug = param.slug || userID;

  const [isLoadingAuthorInfo, setIsLoadingAuthorInfo] = useState(false);
  const [isLoadingPost, setisLoadingPost] = useState(false);
  const userPosts = useSelector(state => state.Posts.userPosts.posts);

  const totalPosts = userPosts?.length || 0;


  useEffect(() => {
    let unmounted = false;
    setIsLoadingAuthorInfo(true);
    setisLoadingPost(true);

    dispatch(
      actFetchPostsByUserIdAsync(slug)
    )
      .then(res => {
        if (res.ok) setIsLoadingAuthorInfo(false)
        else alert('Không hợp lệ')
      })

    dispatch(
      actGetUserInfoAsync(slug)
    )
      .then(res => {
        if (res.ok) setisLoadingPost(false)
        else alert('Không hợp lệ')
      })
    return () => { unmounted = true };
    // eslint-disable-next-line
  }, [slug]);


  const breakpointColumnsObj = {
    default: totalPosts === 1 ? 1 : 2,
    1100: totalPosts === 1 ? 1 : 2,
    900: 1,
  };


  return (
    <main>
      <div className="container">
        <Information totalPosts={totalPosts} userId={slug} loading={isLoadingAuthorInfo} />
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
                loading={isLoadingPost}
              ></Post>)
          }
        </Masonry>

      </div>
    </main>
  )
}


