import { ACT_FETCH_POSTS, ACT_FETCH_POSTS_BY_USERID, ACT_FETCH_POSTS_BY_POSTID, ACT_FETCH_POSTS_BY_SEARCH, ACT_CREATE_NEW_POST, ACT_DELETE_POSTS } from './action';

const initState = {
  postPaging: {
    posts: [],
    pagesize: 3,
    currPage: 1,
  },
  userPosts: {
    posts: []
  },
  postByPostid: {},
  searchPosts: []
}

export default function postsReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_POSTS:
      console.log('action.payload.posts trong fetchPost', action.payload.posts)
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

    case ACT_FETCH_POSTS_BY_SEARCH:
      return {
        ...state,
        searchPosts: action.payload.searchPosts
      }
    case ACT_CREATE_NEW_POST:
      return {
        ...state
      }

    case ACT_DELETE_POSTS:

      const postDeleteId = action.payload.postid;
      console.log('postDeleteId', postDeleteId)

      return {
        ...state,
        postPaging: {
          ...state.postPaging,
          posts: [...state.postPaging.posts.filter(post => post.PID !== postDeleteId)],
        },
        userPosts: {
          ...state.userPosts,
          posts: [...state.userPosts.posts.filter(post => post.PID !== postDeleteId)]
        },
        searchPosts: [...state.searchPosts.filter(post => post.PID !== postDeleteId)]
      }

    default:
      return state
  }
}