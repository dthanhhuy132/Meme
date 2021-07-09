
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actFetchPostsAsync } from '../../store/posts/action';

import MainPost from './MainPost';
import AsidePost from './AsidePost';

import { motion } from 'framer-motion'

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchPostsAsync())
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [])


  return (
    <motion.main className='listPost'
      initial={{
        x: '-100vw'
      }}
      animate={{
        x: 0
      }}

    // transition={{
    //   // ease: "easeOut",
    // }}

    >
      <div className="container">
        <div className="row">
          <MainPost />
          <AsidePost />
        </div>
      </div>
    </motion.main >
  )
}