
import Posts from '../components/Posts';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actFetchPostsAsync } from '../store/posts/action';
import { actFechMeInfoAsync, USER_ID } from '../store/auth/action';

export default function Homepage() {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(actFetchPostsAsync())
    console.log('chay auto dang nhap')
    const userId = localStorage.getItem(USER_ID);
    console.log('userid trong homepage', userId)
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));


    // eslint-disable-next-line
  }, [])


  return (
    <Posts></Posts>
  )
}