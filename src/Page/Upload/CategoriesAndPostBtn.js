import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from '../../components/common/Button'
let editDataCategory = [];
export default function CategoriesAndPostBtn({ propsPass, categories_index, isEdit = false, handleCloseModal }) {
  const categories = useSelector(state => state.Categories.categories);
  const [categoryValue, setCategoryValue] = useState('');
  const [warningCategory, setWarningCategory] = useState(false);


  let {
    formData,
    setFormData,

    warningDesc,
    setWarningDesc,

    warningPicture,
    setWarningPicture,

    isLoading,
    setIsLoading,

    postANewPost,
    postEditPost,
    //Props for edit
    isEdited,
    setIsEdited
  } = propsPass
  //_______________________________________________________________________________ for editData start
  useEffect(() => {
    if (categories_index) setCategoryValue(categories_index);
    categories_index?.forEach(category_index => {
      editDataCategory.push(category_index)
      let inputEls = document.querySelectorAll(`input[value="${category_index}"`);
      inputEls.forEach(inputEl => {
        inputEl.checked = true;
      })
    })
  }, [isEdit])
  //_______________________________________________________________________________ for editData end



  function handleChecked(e) {
    if (e.target.checked) {
      setCategoryValue([...categoryValue, e.target.value])
    } else {
      setCategoryValue(categoryValue.filter(item => item !== e.target.value))
    }
    setWarningCategory(false)
  }

  const categoryString = categoryValue.toString()

  useEffect(() => {
    setFormData({
      ...formData,
      category: categoryString
    })

    //_______________________________________________________________________________ for editData start
    if (isEdit) {
      let editDataCategorySort = editDataCategory.slice().sort();
      let editOrNot = categoryValue.length === editDataCategory.length && categoryValue.slice().sort().every((cateValue, index) => {
        return cateValue === editDataCategorySort[index];
      })
      setIsEdited(editOrNot)
    }

    //_______________________________________________________________________________ for editData end
  }, [categoryValue.length]);



  function handleClickPost(e) {
    e.preventDefault()
    if (formData.obj_image === '' && formData.url_image === '') setWarningPicture(true)
    if (formData.post_content === '') setWarningDesc(true)
    if (formData.category === '') setWarningCategory(true)


    let hasImg = formData.obj_image !== '' || formData.url_image !== '';
    const isDataOK = formData.post_content !== '' && formData.category !== '' && hasImg

    console.log('isDataOK', isDataOK)
    if (!isDataOK) return;

    if (!warningDesc && !warningPicture && !warningCategory && !isEdit) postANewPost();
    console.log('chay xuong toi day')
    if (!warningDesc && !warningPicture && !warningCategory && isEdit) postEditPost()
  }

  return (
    <>
      <div className="col-lg-4">
        <aside className="ass1-aside ass1-aside__edit-post">
          <span style={{ display: 'block', width: '100%', marginBottom: '7px', fontWeight: '600' }}>Chọn danh mục</span>
          {
            warningCategory &&
            <p className='warnign-category'>Chưa chọn danh mục nè bro</p>
          }
          <div className="ass1-aside__edit-post-head">
            {
              categories.map((category, index) => {
                return (
                  <label className="ass1-checkbox" key={index}>
                    <input
                      type="checkbox"
                      name="state-post"
                      value={category.id}
                      onChange={handleChecked}
                    />
                    <span></span>
                    <p>{category.text}</p>
                  </label>
                )
              })
            }
          </div>
          <div>
            {
              !isEdit && <Button isLoading={isLoading} onClick={handleClickPost}>Đăng bài</Button>
            }
          </div>
        </aside>
      </div>
      {isEdit &&
        <div className='col-lg-12' style={{ paddingRight: '2px' }}>
          <div className='dth-modal-footer-editInUpload'>
            <div className='dth-modal-footer__btn-editInUpload'>
              <Button type='modal-btn' onClick={handleCloseModal}>Cancel</Button>
              <Button type='modal-btn' active={true} onClick={handleClickPost} disable={isEdited}>Lưu thay đổi</Button>
            </div>
          </div>
        </div>}
    </>
  )
}
