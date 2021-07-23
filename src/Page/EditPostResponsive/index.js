import { useHistory, useLocation } from "react-router";

import Upload from '../Upload';

export default function EditPostResponsive() {
  const history = useHistory();
  const location = useLocation();

  let getData;
  const DATA_EDIT_REPONSIVE = 'DATA_EDIT_REPONSIVE'
  if (location.pathname === '/edit') {
    getData = history.location.editResponsive;
    if (getData) localStorage.setItem(DATA_EDIT_REPONSIVE, JSON.stringify(getData))
  }

  let dataReload = localStorage.getItem(DATA_EDIT_REPONSIVE);
  let data = getData || JSON.parse(dataReload);

  let post = data?.post
  let categories = data?.categories

  let categories_index = []
  if (categories) {
    categories.forEach(category => {
      categories_index.push(category.tag_index)
    })
  }

  function goBack() {
    history.goBack()
  }


  return (

    <Upload
      isEdit={true}
      post={post}
      categories_index={categories_index}
      goBack={goBack}
    ></Upload>
  )
}