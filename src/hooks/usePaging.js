import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchPostsAsync } from '../store/posts/action';



export default function UsePaging({
  extraParams = {},
  funcSelector = state => state.Posts.postPaging,
  actAsync = actFetchPostsAsync
} = {}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [postsLength, setPostLength] = useState('')

  const {
    posts,
    pagesize,
    currPage
  } = useSelector(funcSelector);


  async function handleLoadMore(e) {
    // e.preventDefault()

    if (isLoading) return;
    setIsLoading(true)

    await dispatch(actAsync({
      pagesize: pagesize,
      currPage: currPage + 1,
      ...extraParams
    })).then(res => {
      setPostLength(res.resdata?.length);
    })
    setIsLoading(false)
  }


  return {
    posts,
    pagesize,
    currPage,
    handleLoadMore,
    isLoading,
    postsLength
  }
}