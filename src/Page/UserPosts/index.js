import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Masonry from 'react-masonry-css'
import { useState } from 'react';

import { actFetchPostsByUserIdAsync } from '../../store/posts/action';
import { actGetUserInfoAsync } from '../../store/auth/action';

import Information from './Information';
import Post from '../../components/PostsItems';

export default function UserPosts() {
  const param = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.Auth.currentUser);
  const userID = currentUser?.USERID;

  const slug = param.slug || userID;

  const [isLoadingAuthorInfo, setIsLoadingAuthorInfo] = useState(false);
  const userPosts = useSelector(state => state.Posts.userPosts.posts);
  const totalPosts = userPosts?.length || 0;

  //________________________________________________________________ Check Login or Not start

  useEffect(() => {
    // let unmounted = true;
    setIsLoadingAuthorInfo(true);

    dispatch(
      actFetchPostsByUserIdAsync(slug)
    ).then(res => {
      if (res.ok) {
      } else alert('Không hợp lệ')
    })

    dispatch(
      actGetUserInfoAsync(slug)
    ).then(res => {
      if (res.ok) setIsLoadingAuthorInfo(false)
      else alert('Không hợp lệ')
    })

    // return () => unmounted = false
    // eslint-disable-next-line
  }, [slug]);

  const breakpointColumnsObj = {
    default: totalPosts === 1 ? 1 : 2,
    1100: totalPosts === 1 ? 1 : 2,
    900: 1,
  };


  return (
    <main className='dth-user-page'>
      <div className="container">
        <Information totalPosts={totalPosts} userId={slug} loading={isLoadingAuthorInfo} />
        {isLoadingAuthorInfo
          ?
          <> </>
          :
          < Masonry
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
        }
      </div >
    </main >
  )
}


