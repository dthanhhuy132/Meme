import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { actFechCommentsAsync } from "../../store/comments/action";


import ContentImage from "./ContentImage";
import PostTime from "./PostTime";
import Author from "./Author";
import UserSetting from './UserSetting'
import Avatar from "./Avartar";
import CmtStas from "./CmtStas";
import Comment from "./Comment";


export default function PostItem({
  post,
  classCol,
  comment = true,
  authorInfo,
  commentForPostDetail = false,
}) {
  // console.log('post trong post item', post)

  const dispatch = useDispatch();
  const [commentCommon, setCommentCommon] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const currentUser = useSelector(state => state.Auth.currentUser);

  let displayUserSetting = false;
  if (currentUser?.USERID === post?.USERID || currentUser?.fullname === post?.fullname) {
    displayUserSetting = true;
  }

  const classes = classNames('ass1-section__item', {
    'col-lg-6': classCol === '6'
  })

  function handleClickCmt(e) {
    e.preventDefault();
    setCommentCommon(!commentCommon);
    setIsLoadingComment(true);

    dispatch(
      actFechCommentsAsync(post?.PID)
    ).then(res => {
      if (res.ok) setIsLoadingComment(false)
    });
    ;
  }

  const displayComment = commentCommon || commentForPostDetail
  const [cmtCount, setCmtCout] = useState(post?.count);
  function countCmtAddNew() {
    setCmtCout(Number(cmtCount) + 1)
  }

  if (!post) {
    return null
  }

  
  return (
    <div className={classes}>
      <div className="ass1-section" >
        <div className="ass1-section__head head-user-for-author">
          <Avatar AvatarURL={post?.profilepicture || authorInfo?.profilepicture} userid={post?.USERID} ></Avatar>
          {displayUserSetting && < UserSetting postid={post?.PID} post={post} />}

          <div>
            <Author userid={post?.USERID}>{post.fullname || authorInfo?.fullname}</Author>
            <PostTime>{post?.time_added}</PostTime>
          </div>
        </div>
        <ContentImage postContent={post?.post_content} postImage={post?.url_image} postid={post?.PID} post={post}></ContentImage>
        {comment && <CmtStas handleClickCmt={handleClickCmt} >{cmtCount || 0}</CmtStas>}

        {
          displayComment && <Comment postid={post?.PID} loadingComment={isLoadingComment} countCmtAddNew={countCmtAddNew} userID={post?.USERID} />
        }
      </div>
    </div>
  )
}