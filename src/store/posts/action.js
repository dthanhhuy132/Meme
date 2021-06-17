import postsService from '../../service/posts'

export const ACT_FETCH_POSTS = 'ACT_FETCH_POSTS';
export const ACT_FETCH_POSTS_BY_USERID = 'ACT_FETCH_POSTS_BY_USERID';
export const ACT_FETCH_POSTS_BY_POSTID = 'ACT_FETCH_POSTS_BY_POSTID';


///////////////////// Get post for HomePage
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
  pagesize = 5,
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
        posts: res.data.posts,
        pagesize: pagesize,
        currPage: currPage
      }))

    } catch (err) { }
  }
}



//////////////////// Get Posts by UserID
function actFetchPostsByUserId(posts) {
  return {
    type: ACT_FETCH_POSTS_BY_USERID,
    payload: {
      posts
    }
  }
}

export function actFetchPostsByUserIdAsync(userId) {
  return async dispatch => {
    try {
      const res = await postsService.getPostsByUserId(userId)

      dispatch(actFetchPostsByUserId(res.data.posts))
      return {
        ok: true
      }
    } catch (e) {
      return {
        ok: false
      }
    }
  }
}


////////////////////////////////// Get post by postId 
export function actFetchPostByPostId(post_category) {
  return {
    type: ACT_FETCH_POSTS_BY_POSTID,
    payload: {
      post_category
    }
  }
}

export function actFetchPostByPostIdAsync(postid) {
  return async dispatch => {
    try {
      const res = await postsService.getPostByPostId(postid)
      const post_category = res.data.data;
      // console.log('post trong action', post)
      dispatch(actFetchPostByPostId(post_category))
    } catch (er) {

    }
  }
}