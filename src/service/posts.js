import api from './api';

const postsService = {
  getPosts({
    pagesize = 2,
    currPage = 1,
    ...restParams
  } = {}) {

    return api.call().get('/post/getListPagination.php', {
      params: {
        pagesize: pagesize,
        currPage: currPage,
        ...restParams
      }
    })
  },
  getPostsByUserId(userId) {
    return api.callWithToken().get('/post/getListPostUserID.php?userid=' + userId)
  },

  getPostByPostId(postid) {
    return api.callWithToken().get('/post/post.php', {
      params: {
        postid
      }
    })
  },

  searchPost(query) {
    return api.call().get('/post/search.php', {
      params: {
        query,
      }
    })
  },

  deletePost(postid) {
    return api.callWithToken().post('/post/delete.php', {
      'postid': postid
    })
  },

  activeAndDeactivePost(postid) {
    return api.callWithToken().post('/post/activeDeactive.php', {
      'postid': postid
    })
  },

  editPost(formData) {
    return api.callWithToken().post('/post/edit.php', formData)
  },


  postNewPost(formData) {
    return api.callWithToken().post('/post/addNew.php', formData)
  }


}

export default postsService;

