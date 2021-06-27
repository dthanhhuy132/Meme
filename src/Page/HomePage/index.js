
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actFetchPostsAsync } from '../../store/posts/action';

import MainPost from './MainPost';
import AsidePost from './AsidePost';

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchPostsAsync())

    // eslint-disable-next-line
  }, [])

  

  return (
    <main className='listPost'>
      <div className="container">
        <div className="row">
          <MainPost />
          <AsidePost />
        </div>
      </div>
    </main >
  )
}