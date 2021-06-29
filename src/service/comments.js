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
    comment,
    postid
  }) {
    console.log('du lien trong cmt service', comment, postid)
    return api.callWithToken().post('/comment/add_new.php', {
      comment,
      postid
    })
  }
}

export default commentsService;