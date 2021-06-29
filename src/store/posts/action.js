import postsService from '../../service/posts'

export const ACT_FETCH_POSTS = 'ACT_FETCH_POSTS';
export const ACT_FETCH_POSTS_BY_USERID = 'ACT_FETCH_POSTS_BY_USERID';
export const ACT_FETCH_POSTS_BY_POSTID = 'ACT_FETCH_POSTS_BY_POSTID';
export const ACT_FETCH_POSTS_BY_SEARCH = 'ACT_FETCH_POSTS_BY_SEARCH';
export const ACT_DELETE_POSTS = 'ACT_DELETE_POSTS';
export const ACT_EDIT_POSTS = 'ACT_EDIT_POSTS';
export const ACT_CREATE_NEW_POST = 'ACT_CREATE_NEW_POST';


//___________________________________________________________________Get post for HomePage
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



//___________________________________________________________________Get Posts by UserID
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


//___________________________________________________________________ Get post by postId 
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
      dispatch(actFetchPostByPostId(post_category))

      return {
        ok: true
      }
    } catch (er) {
      return {
        ok: false
      }
    }
  }
}

////////___________________________________________________________________ SEARCH POST 
export function actSearchPost(searchPosts) {
  return {
    type: ACT_FETCH_POSTS_BY_SEARCH,
    payload: {
      searchPosts
    }
  }
}

export function actSearchPostAsync(query) {
  return async dispatch => {
    try {
      const res = await postsService.searchPost(query)
      const posts = res.data.posts
      dispatch(actSearchPost(posts))
      console.log('res trong search Post', res)
      return {
        ok: true
      }

    } catch (er) {
      return {
        ok: false
      }
    }
  }
}

//___________________________________________________________________ DELETE POST
export function actDeletePost(postid) {
  return {
    type: ACT_DELETE_POSTS,
    payload: {
      postid
    }
  }
};

export function actDeletePostAsync(postid) {
  return async dispatch => {
    try {
      const res = await postsService.deletePost(postid)
      console.log('res tra ve tu xoa bai', res)
      dispatch(actDeletePost(postid))
      return {
        ok: true
      }
    } catch (er) {
      return {
        ok: false
      }
    }
  }
}

//___________________________________________________________________ EDIT POST

export function editPost() {
  return {
    type: ACT_EDIT_POSTS,
    payload: {

    }
  }
}

export function editPostAsync(formData) {
  return async dispatch => {
    try {
      const res = await postsService.editPost(formData)

      console.log('res trong action edit', res)
      return {
        ok: true
      }

    } catch (er) {
      return {
        ok: false
      }
    }
  }
}
//___________________________________________________________________ ACTIVE/DEACTIVE A POST

export function actActiveAndDeactivePost(post) {
  return {
    type: ACT_DELETE_POSTS,
    payload: {
      post
    }
  }
};

export function actActiveAndDeactivePostAsync(postid) {
  return async dispatch => {
    try {
      const res = await postsService.activeAndDeactivePost(postid);
      console.log('res tra ve tu an/mo bai', res)
      return {
        ok: true
      }
    } catch (er) {
      return {
        ok: false
      }
    }
  }
}





// ___________________________________________________________________ CREATE A NEW POST 
export function actPostNewPost(newPost) {
  return {
    type: ACT_CREATE_NEW_POST,
    payload: {
      newPost
    }
  }
}


export function actPostNewPostAsync(formData) {
  return async dispatch => {
    try {
      const res = await postsService.postNewPost(formData)

      return {
        ok: true
      }

    } catch (err) {
      return {
        ok: false
      }
    }
  }
}