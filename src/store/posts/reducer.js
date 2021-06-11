import { ACT_FETCH_POSTS } from './action';

const initState = {
  postPaging: {
    posts: [],
    pagesize: 3,
    currPage: 1,
  }
}

export default function postsReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_POSTS:
      return {
        ...state,
        postPaging: {
          ...state.postPaging.posts,
          posts: action.payload.currPage === 1
            ? action.payload.posts
            : [
              ...state.postPaging.posts,
              ...action.payload.posts
            ],
          pagesize: action.payload.pagesize,
          currPage: action.payload.currPage
        }
      }
    default:
      return state
  }
}