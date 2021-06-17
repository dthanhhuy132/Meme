import api from "./api"


const categoryService = {
  getCategoriesList() {
    return api.call().get('categories/index.php')
  },

  getCategoriesPost({
    pagesize,
    currPage,
    tagIndex
  }) {
    console.log('parma trong act cate post', pagesize, currPage, tagIndex)
    return api.callWithToken().get('/post/getListByCategory.php', {
      params: {
        pagesize,
        currPage,
        tagIndex
      }
    })
  }

}


export default categoryService;