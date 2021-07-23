import {
  ACT_FETCH_POSTS,
  ACT_FETCH_POSTS_BY_USERID,
  ACT_FETCH_POSTS_BY_POSTID,
  ACT_FETCH_POSTS_BY_SEARCH,
  ACT_CREATE_NEW_POST,
  ACT_DELETE_POSTS,
  ACT_EDIT_POSTS
} from './action';

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
      // console.log('action.payload.posts trong fetchPost', action.payload.posts)
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
        ...state,
        postPaging: {
          ...state.postPaging,
          posts: [
            action.payload.newPost,
            ...state.postPaging.posts,
          ],
        },
        userPosts: {
          ...state.userPosts,
          posts: [
            action.payload.newPost,
            ...state.userPosts.posts,
          ]
        },
        searchPosts: [
          action.payload.newPost,
          ...state.searchPosts,
        ],
      }

    case ACT_EDIT_POSTS:
      let postid = action.payload.editPost.PID;
      let editPost = action.payload.editPost;

      let copyState = { ...state };

      let indexPostsInPostPaging;
      copyState.postPaging.posts && copyState.postPaging.posts.forEach((post, index) => {
        if (post.PID === postid) {
          indexPostsInPostPaging = index
        }
      })
      copyState.postPaging.posts.splice(indexPostsInPostPaging, 1, editPost);


      let indexSearchPosts;
      copyState.searchPosts && copyState.searchPosts.forEach((post, index) => {
        if (post.PID === postid) {
          indexSearchPosts = index
        }
      })
      copyState.searchPosts.splice(indexSearchPosts, 1, editPost)

      let indexUserPost;
      copyState.userPosts.posts && copyState.userPosts.posts.forEach((post, index) => {
        if (post.PID === postid) {
          indexUserPost = index
        }
      })
      copyState.userPosts.posts.splice(indexUserPost, 1, editPost)


      return {
        ...state,
        postPaging: {
          ...state.postPaging,
          posts: [...copyState.postPaging.posts],
        },
        userPosts: {
          ...state.userPosts,
          posts: [...copyState.userPosts.posts]
        },
        searchPosts: [...copyState.searchPosts],

      }



    case ACT_DELETE_POSTS:
      const postDeleteId = action.payload.postid;
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
        searchPosts: [...state.searchPosts.filter(post => post.PID !== postDeleteId)],
      }

    default:
      return state
  }
}