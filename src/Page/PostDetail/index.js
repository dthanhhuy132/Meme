import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actFechCommentsAsync, actResetComment } from '../../store/comments/action';
import { actFetchPostByPostIdAsync } from '../../store/posts/action';
import { actGetUserInfoAsync } from '../../store/auth/action';


import Post from '../../components/PostsItems';
import PostDetailAside from './PostDetail.AsidePost'

export default function PostDetail() {
  const param = useParams()
  const dispatch = useDispatch();
  const post_category = useSelector(state => state.Posts.postByPostid);
  // const rootComments = useSelector(state => state.Comments.comments);
  const authorInfo = useSelector(state => state.Auth.userData);
  // console.log('currPostUser', authorInfo)

  // console.log('rootComments', rootComments)

  const postid = param?.postid;
  // console.log('post id trong postDetail', postid)
  // const key = `postCmt-${postid}`

  const post = post_category?.post;
  // console.log('post trong postDetail', post)

  const category = post_category?.categories;
  // const comments = rootComments[key];
  // console.log('comments that ne', comments)
  // console.log('category trong postdetail', category)

  const postUserId = post?.USERID;
  // console.log('postUserId', postUserId);



  useEffect(() => {
    dispatch(actFetchPostByPostIdAsync(postid));
    dispatch(actResetComment());
    dispatch(actFechCommentsAsync(postid));
    dispatch(actGetUserInfoAsync(postUserId));
  }, [postid, postUserId, dispatch])

  return (
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

  )
}