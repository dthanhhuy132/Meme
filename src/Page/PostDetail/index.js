import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { actFechCommentsAsync, actResetComment } from '../../store/comments/action';
import { actFetchPostByPostIdAsync } from '../../store/posts/action';
import { actGetUserInfoAsync } from '../../store/auth/action';


import Post from '../../components/PostsItems';
import PostDetailAside from './PostDetail.AsidePost'

export default function PostDetail() {
  const param = useParams()
  const dispatch = useDispatch();
  const post_category = useSelector(state => state.Posts.postByPostid);
  const authorInfo = useSelector(state => state.Auth.userData);

  const postid = param?.postid;

  const post = post_category?.post;
  const category = post_category?.categories;
  const postUserId = post?.USERID;

  function dispatchAction() {
    dispatch(actResetComment());
    dispatch(actFetchPostByPostIdAsync(postid));
    dispatch(actFechCommentsAsync(postid));
    dispatch(actGetUserInfoAsync(postUserId));
  }


  useEffect(() => {
    dispatchAction()
  }, [postid, postUserId, dispatch])

  return (
    <main className='dth-post-detail'>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ass1-section__list">
              <Post
                post={post}
                authorInfo={authorInfo}
                comment={false}
                commentForPostDetail={true} />
            </div>
          </div>
          <PostDetailAside postAside={category} />
        </div>
      </div>
    </main>

  )
}