import { ACT_FETCH_CATEGORIES, ACT_FETCH_CATEGORY_POSTS } from "./actions";

const initState = {
  categories: [],
  categoryPosts: {
    posts: [],
    pagesize: 5,
    currPage: 1,
  }
}

export default function categoriesReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      }

    case ACT_FETCH_CATEGORY_POSTS:
      return {
        ...state,
        categoryPosts: {
          posts: action.payload.currPage === 1
            ? action.payload.posts
            : [...state.categoryPosts.posts,
            ...action.payload.posts],
          pagesize: action.payload.pagesize,
          currPage: action.payload.currPage,
        }
      }


    default:
      return state;
  }
}