import { useHistory } from "react-router";

import Upload from '../Upload';
import DotLoading from '../../components/common/Loading/DotLoading';

export default function EditPostResponsive() {
  const history = useHistory();

  let data = history.location.editResponsive;
  if (!data) {
    history.push('/');
    return null;
  }

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