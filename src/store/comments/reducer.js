import { ACT_FETCH_COMMENTS, ACT_POST_NEW_COMMENT, ACT_RESET_COMMENT } from "./action";


const initState = {
  comments: {}
}


export default function CommentsReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_COMMENTS:

      // comments: {
      // key - 1: [{},{}]
      // key - 2: [{},{}]
      // }
      const comments = action.payload.comments;
      const postid = action.payload.postid;

      let key = `postCmt-${postid}`;
      const postCmtById = {};

      postCmtById[key] = comments;

      return {
        ...state,
        comments: {
          ...state.comments,
          ...postCmtById
        }

      }

    case ACT_RESET_COMMENT:
      return {
        ...state,
        comments: {}
      }

    case ACT_POST_NEW_COMMENT:
      let copyCmtState = { ...state.comments }
      const newComment = action.payload.newComment;
      const postidNewComment = action.payload.postid;

      const postCmtUpdate = copyCmtState[`postCmt-${postidNewComment}`].push(newComment)

      return {
        ...state,
        comments: {
          ...state.comments,
          ...postCmtUpdate
        }
      }

    default:
      return state;
  }
}