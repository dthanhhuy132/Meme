import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';

import { actFechCommentsAsync, actResetComment } from '../../store/comments/action';
import { actFetchPostByPostIdAsync } from '../../store/posts/action';


import PostDetailAside from './PostDetail.AsidePost'



import ContentImage from "../../components/PostsItems/ContentImage";
import PostTime from "../../components/PostsItems/PostTime";
import Author from "../../components/PostsItems/Author";
import UserSetting from '../../components/PostsItems/UserSetting'
import Avatar from "../../components/PostsItems/Avartar";
import CmtStas from "../../components/PostsItems/CmtStas";
import Comment from "../../components/PostsItems/Comment";

import { motion } from 'framer-motion'

export default function PostDetail({ comment = true }) {
  const param = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const post_category = useSelector(state => state.Posts.postByPostid);
  console.log('post_category trong postdetail', post_category)

  const data = location.post;
  const postid = param?.postid;

  const category = post_category?.categories;

  const [isLoadingCategory, setIsLoadingCategory] = useState(true);

  function dispatchAction() {
    dispatch(actResetComment());
    dispatch(actFechCommentsAsync(postid));
    dispatch(
      actFetchPostByPostIdAsync(postid)
    ).then(res => {
      if (res.ok) setIsLoadingCategory(false)
    });
  }
  useEffect(() => {
    dispatchAction()
  }, [postid, dispatch])

  let displayUserSetting = false;

  function handleClickCmt(e) {
    e.preventDefault();
  };

  const [cmtCount, setCmtCout] = useState(data.count);
  function countCmtAddNew() {
    setCmtCout(Number(cmtCount) + 1)
  }

  const currentUser = useSelector(state => state.Auth.currentUser)
  const linkToUser = currentUser?.USERID === data.USERID ? '/profile' : `/user/${data.USERID}`;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.main className='dth-post-detail'
      initial={{
        y: -50,
        scale: 1.1
      }}

      animate={{
        x: 0,
        y: 0,
        scale: 1
      }}

      exit={{
        scale: 0.9
      }}

      transition={{
        type: 'spring',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ass1-section__list">
              <div className='ass1-section__item'>
                <div className="ass1-section" >
                  <div className="ass1-section__head head-user-for-author">
                    <Avatar AvatarURL={data.profilepicture} userid={data.USERID} ></Avatar>
                    {displayUserSetting && < UserSetting postid={data.PID} post={data} />}

                    <div>
                      <Link to={linkToUser} className="ass1-section__name"> {data.fullname}</Link >
                      <PostTime>{data.time_added}</PostTime>
                    </div>
                  </div>
                  <ContentImage postContent={data.post_content} postImage={data.url_image} postid={data.PID}></ContentImage>
                  {comment && <CmtStas handleClickCmt={handleClickCmt} >{cmtCount || 0}</CmtStas>}

                  <Comment postid={data.PID} countCmtAddNew={countCmtAddNew} />

                </div>
              </div>
            </div>
          </div>
          <PostDetailAside postAside={category} isLoadingCategory={isLoadingCategory} />
        </div>
      </div>
    </motion.main >

  )
}