import commentsService from "../../service/comments";

export const ACT_FETCH_COMMENTS = 'ACT_FETCH_COMMENTS';
export const ACT_POST_NEW_COMMENT = 'ACT_POST_NEW_COMMENT';
export const ACT_RESET_COMMENT = 'ACT_RESET_COMMENT';


/////////////// Get comments by postId
export function actFetchComments({ comments, postid }) {

  return {
    type: ACT_FETCH_COMMENTS,
    payload: {
      comments,
      postid
    }
  }
}

export function actFechCommentsAsync(postid) {
  return async dispatch => {
    try {
      const res = await commentsService.getComments(postid)
      const comments = res.data.comments;

      dispatch(actFetchComments({
        comments,
        postid
      }))

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


////////////////////////////////////// Post new comments

export function actPostNewComment({ newComment, postid }) {
  return {
    type: ACT_POST_NEW_COMMENT,
    payload: {
      newComment,
      postid
    }
  }
}

export function actPostNewCommentAsync({
  comment,
  postid
}) {
  return async dispatch => {
    try {
      const res = await commentsService.postNewComment({
        comment,
        postid
      });
      console.log('res trong new comment', res);
      const newComment = res.data.body;
      const cmtId = newComment.CID;

      dispatch(actPostNewComment({
        newComment,
        postid
      }))

      return {
        ok: true,
        cmtId
      }
    } catch (er) {

      return {
        ok: false
      }
    }
  }
}

/////////////////////////////////// ____________________________ACTION RESET COMMENTS
export function actResetComment() {
  return {
    type: ACT_RESET_COMMENT
  }
}