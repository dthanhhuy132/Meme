import categoryService from "../../service/category";

export const ACT_FETCH_CATEGORIES = 'ACT_FETCH_CATEGORIES';
export const ACT_FETCH_CATEGORY_POSTS = 'ACT_FETCH_CATEGORY_POSTS';


///////////// Get category name list
export function actFetchCategories(categories) {
  return {
    type: ACT_FETCH_CATEGORIES,
    payload: {
      categories
    }
  }
}

export function actFetchCategoriesAsync() {
  return async dispatch => {
    try {
      const res = await categoryService.getCategoriesList()

      const categories = res.data.categories;
      dispatch(actFetchCategories(categories))
    } catch (er) {

    }
  }
}


///////////// Get category posts list
export function actFetchCategoryPosts({
  posts,
  pagesize,
  currPage,
}) {

  return {
    type: ACT_FETCH_CATEGORY_POSTS,
    payload: {
      posts,
      pagesize,
      currPage,
    }
  }
}

export function actFetchCategoryPostsAsync({
  pagesize = 5,
  currPage = 1,
  tagIndex = 1,
} = {}) {
  return async dispatch => {
    try {
      const res = await categoryService.getCategoriesPost({
        pagesize,
        currPage,
        tagIndex,
      });

      console.log('res trong action', res.data.posts.length)
      const posts = res.data.posts;
      dispatch(actFetchCategoryPosts({
        posts,
        pagesize,
        currPage,
      }))

    } catch (er) {

    }
  }
}
