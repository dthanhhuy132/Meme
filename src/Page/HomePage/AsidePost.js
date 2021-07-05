import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchPostsByUserIdAsync } from '../../store/posts/action';

import Post from '../../components/PostsItems'

export default function AsidePost() {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.Auth.currentUser);
  const currUserId = currentUser?.USERID;
  const userPosts = useSelector(state => state.Posts.userPosts.posts);

  const userPostsLength = userPosts?.length;
  const hasPosts = userPostsLength > 0 ? true : false;

  const posts = userPosts?.slice(0, 3);
  const isLoadAllPosts = userPostsLength > 3;

  useEffect(() => {
    dispatch(actFetchPostsByUserIdAsync(currUserId))
  }, [currUserId, dispatch])

  function handClickOpenLogin(e) {
    e.preventDefault()
    const LoginEl = document.querySelector('.dth-btn-login');
    LoginEl.click();
  }


  return (
    <div className="col-lg-4">
      {
        !currUserId
          ?
          <aside className="ass1-aside">
            <div className="ass1-content-head__t">
              <div>Bài viết của bạn.</div>
            </div>
            <div className='homepage-aside-login'>Vui lòng
              <a href='/' onClick={handClickOpenLogin}> Đăng nhập </a>
              để xem bài viết của bạn
            </div>
          </aside>
          : hasPosts
            ?
            <div className="ass1-section__list">
              <div className="ass1-content-head__t">
                <div>Bài viết của bạn</div>
              </div>
              {
                posts?.map(post => (
                  <Post
                    key={post.PID}
                    post={post}
                    comment={false}
                  ></Post>
                ))
              }
              <div className='center'>
                {isLoadAllPosts && <Link to='/profile' >Xem tất cả bài viết của tôi</Link>}
              </div>
            </div>
            :
            <aside className="ass1-aside">
              <div className="ass1-content-head__t">
                <div>Bạn chưa có bài viết náo</div>
              </div>
            </aside>
      }
    </div>
  )
}