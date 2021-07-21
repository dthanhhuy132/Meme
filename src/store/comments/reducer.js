import { ACT_FETCH_COMMENTS, ACT_POST_NEW_COMMENT, ACT_RESET_COMMENT } from "./action";


const initState = {
  comments: {},
  commentsReply: {}
}

// Post ID --> cmtID --> replyCmtId


export default function CommentsReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_COMMENTS:
      const comments = action.payload.comments;
      const postid = action.payload.postid;


      const postCmtById = {};
      let key = `postCmt-${postid}`;
      postCmtById[key] = comments.filter(comment => comment.comment.indexOf('CodeCommentID-Start') === -1);

      const postCmtReply = {};
      comments.forEach(comment => {
        if (comment.comment.indexOf('CodeCommentID-Start') !== -1) {
          let commetReplyParentId = comment.comment.slice(comment.comment.indexOf('CodeCommentID-Start') + 19, comment.comment.indexOf('CodeCommentID-End'));
          let cmtReplyKey = `cmtReply-${postid}-${commetReplyParentId}`

          !postCmtReply[cmtReplyKey]
            ? postCmtReply[cmtReplyKey] = [comment]
            : postCmtReply[cmtReplyKey].push(comment)
        }
      })

      return {
        ...state,
        comments: {
          ...state.comments,
          ...postCmtById
        },
        commentsReply: {
          ...state.commentsReply,
          ...postCmtReply
        }
      }

    case ACT_RESET_COMMENT:
      return {
        ...state,
        comments: {},
        commentsReply: {}
      }

    case ACT_POST_NEW_COMMENT:
      let copyCmtState = { ...state.comments }
      let copyCmtReplyState = { ...state.commentsReply }
      const newComment = action.payload.newComment;
      const postidNewComment = action.payload.postid;

      let postCmtUpdate;
      let postCmtReplyUpdate;
      let cmtReplyKey

      if (newComment.comment.indexOf('CodeCommentID-Start') === - 1) {// Comment Parent
        postCmtUpdate = copyCmtState[`postCmt-${postidNewComment}`].push(newComment);
      } else {// Comment reply
        let commetReplyParentId = newComment.comment.slice(newComment.comment.indexOf('CodeCommentID-Start') + 19, newComment.comment.indexOf('CodeCommentID-End'));
        cmtReplyKey = `cmtReply-${postidNewComment}-${commetReplyParentId}`;
        if (copyCmtReplyState[cmtReplyKey]) {
          postCmtReplyUpdate = copyCmtReplyState[cmtReplyKey].push(newComment)
        } else {
          copyCmtReplyState[cmtReplyKey] = [newComment]
          postCmtReplyUpdate = copyCmtReplyState
        }
      }
      // Comment children

      return {
        ...state,
        comments: {
          ...state.comments,
          ...postCmtUpdate
        },
        commentsReply: {
          ...state.commentsReply,
          ...postCmtReplyUpdate
        }

      }

    default:
      return state;
  }
}