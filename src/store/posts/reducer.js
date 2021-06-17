import { ACT_FETCH_POSTS, ACT_FETCH_POSTS_BY_USERID, ACT_FETCH_POSTS_BY_POSTID } from './action';

const initState = {
  postPaging: {
    posts: [],
    pagesize: 3,
    currPage: 1,
  },
  userPosts: {
    posts: []
  },
  postByPostid: {}
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

    case ACT_FETCH_POSTS_BY_USERID:
      return {
        ...state,
        userPosts: {
          posts: action.payload.posts
        }
      }

    case ACT_FETCH_POSTS_BY_POSTID:
      return {
        ...state,
        postByPostid: action.payload.post_category
      }

    default:
      return state
  }
}