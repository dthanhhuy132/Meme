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

  searchPost(query)

}

export default postsService;

