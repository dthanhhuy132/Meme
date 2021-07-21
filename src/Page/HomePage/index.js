
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actFetchPostsAsync } from '../../store/posts/action';

import MainPost from './MainPost';
import AsidePost from './AsidePost';

import { motion } from 'framer-motion'

export default function Homepage() {
  const dispatch = useDispatch();

<<<<<<< HEAD
  // useEffect(() => {
  //   dispatch(actFetchPostsAsync())
  //   window.scrollTo(0, 0)
  //   // eslint-disable-next-line
  // }, [])
=======
  useEffect(() => {
    dispatch(actFetchPostsAsync())
    // eslint-disable-next-line
  }, [])
>>>>>>> Final1


  return (
    <motion.main className='listPost'
      initial={{
        opacity: 0.5,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}

      transition={{
        type: "spring",
        duration: 0.3
      }}

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