import api from './api';


const commentsService = {
  getComments(postid) {
    return api.call().get('/comment/comments.php', {
      params: {
        postid
      }
    })
  },

  postNewComment({
    comments,
    postid
  }) {
    return api.callWithToken().post('/comment/add_new.php', {
      params: {
        comments,
        postid
      }
    })
  }
}

export default commentsService;