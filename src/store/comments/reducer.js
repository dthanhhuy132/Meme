import { ACT_FETCH_COMMENTS, ACT_RESET_COMMENT } from "./action";


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

      // console.log('postCmtById', postCmtById)


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

    default:
      return state;
  }
}