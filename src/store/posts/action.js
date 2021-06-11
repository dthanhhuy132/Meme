import postsService from '../../service/posts'

export const ACT_FETCH_POSTS = 'ACT_FETCH_POSTS';
export const ACT_FETCH_POSTS_BY_USERID = 'ACT_FETCH_POSTS_BY_USERID'

// Get post for HomePage
function actFetchPosts({ posts, pagesize, currPage }) {
  return {
    type: ACT_FETCH_POSTS,
    payload: {
      posts,
      pagesize,
      currPage,
    }
  }
}

export function actFetchPostsAsync({
  pagesize = 3,
  currPage = 1,
  ...restParams
} = {}) {
  return async (dispatch, state) => {
    try {
      const res = await postsService.getPosts({
        pagesize: pagesize,
        currPage: currPage,
        ...restParams
      })

      dispatch(actFetchPosts({
        posts: res.data,
        pagesize: pagesize,
        currPage: currPage
      }))

    } catch (err) { }
  }
}



// Get Posts by UserID
function actFetchPostsByUserId(posts) {
  return {
    type: ACT_FETCH_POSTS_BY_USERID,
    payload: posts
  }
}

export function actFetchPostsByUserIdAsync(userId) {
  return async dispatch => {
    try {
      const res = await postsService.getPostsByUserId(userId)

      console.log('res trong get posts by userid', res)
      dispatch(actFetchPostsByUserId(res.data))
    } catch (e) {

    }
  }
}