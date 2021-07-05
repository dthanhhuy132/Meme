import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actDeletePostAsync, actFetchPostByPostIdAsync } from "../../store/posts/action";
// antdesign:
import { notification } from 'antd';

import Modal from '../../components/Modal';
import Upload from '../../Page/Upload';
import DotLoading from '../../components/common/Loading/DotLoading';
import { useHistory, useLocation } from "react-router";


// editPostAsync
export default function UserSetting({ postid, post }) {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(e) {
    e.preventDefault()
    setIsOpenSetting(!isOpenSetting);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        e.target.localName !== 'li'
        && e.target.className !== 'fas fa-ellipsis-v'
        && e.target.className !== 'ass1-section__head-user-setting'
        && e.target.className !== 'dth-user-login__setting'
        && e.target.className !== 'dth-user-login__setting li'
      ) setIsOpenSetting(false);

      let userSettingPrevious = document.querySelectorAll('.user-setting-item__PostDetail')
      if (userSettingPrevious) userSettingPrevious.forEach(item => item.style.display = 'none')
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  //// Setting Function -------------------- Edit, Delete, Hide
  const dispatch = useDispatch();

  let [isOpenModal, setIsOpenModal] = useState(false);
  let [header, setHeader] = useState('Thông báo');
  let [actAsyncName, setActAsyncName] = useState('')

  // ___________________________________________________________________ Common function
  // Common function

  function handleModal() { // --> Open Modal
    setIsOpenModal(!isOpenModal)
    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('dth-modal-open');
  }

  // useEffect(() => {
  //   let mounted = true;
  //   return () => { mounted = false }
  // })

  // EDIT FUNCTION ______________________________________________________ EDIT FUNCTION
  const [isRenderFooter, setIsRenderFooter] = useState(true)
  const categories = useSelector(state => state.Posts.postByPostid.categories);

  let categories_index = []
  if (categories) {
    categories.forEach(category => {
      categories_index.push(category.tag_index)
    })
  }

  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingForEdit, setIsLoadingForEdit] = useState(false);

  function setEditOff() {
    setIsEdit(false);
    setIsLoadingForEdit(false)
  }

  function handleClick_Edit() {
    setIsRenderFooter(false)
    handleModal()
    setIsLoadingForEdit(true)
    dispatch(actFetchPostByPostIdAsync(postid)).then(res => {
      if (res.ok) {
        setIsEdit(true)
        setHeader('Chỉnh sửa bài viết');
      }
    });
  }

  function handleCloseModal() {
    handleModal()
    isEdit && setEditOff()
  }

  // DELETE FUNCTION _____________________________________________________ DELETE FUNCTION
  const location = useLocation();
  const history = useHistory();

  function dispatchDelete() {
    setIsLoading(true);
    dispatch(
      actDeletePostAsync(postid)
    ).then(res => {
      if (res.ok) {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Bạn sẽ không còn nhìn thấy nó nữa",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Ố ồ, xóa bài viết thành công');

        if (location.pathname.indexOf('/post/') !== -1) history.push('/')

      } else {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Kiểm tra lại thật kĩ nào",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Xóa không thành công!')
      }
    });
    handleModal()
  }

  function handleClick_Delete(postid) {
    setIsRenderFooter(true);
    handleModal()
    setHeader('Bạn chắn chắn muốn xóa bài viết này?');
    setActAsyncName('delete')
  }

  //_______________________________________________________________________ FINISH

  let modalProp = {
    postid,

    isOpenModal,
    setIsOpenModal,

    actAsyncName,
    dispatchDelete,

    isEdit,
    setEditOff
  }

  const [isOpenEdit_responsive, setIsOpenEdit_responsive] = useState(false)

  function handleClick_edit_responsive(e) {
    e.preventDefault();
    setIsOpenEdit_responsive(true)
    dispatch(actFetchPostByPostIdAsync(postid)).then(res => {
      if (res.ok) {
        setIsOpenEdit_responsive(false)
        history.push({
          pathname: '/edit',
          editResponsive: {
            post: post,
            categories: res.post_category.categories
          }
        })
      }
    });
  }

  return (
    <>
      <p onClick={handleClick} className='ass1-section__head-user-setting'>
        <i className="fas fa-ellipsis-v"></i>
      </p>
      {
        isOpenSetting &&
        <ul className='user-setting__items user-setting-item__PostDetail' onClick={e => e.preventDefault()}>
          <li onClick={handleClick_Edit}>
            <div><i className="far dth-far fa-edit"></i></div>
            <p>Chỉnh sửa bài viết</p>
          </li>

          <li className='dth-userSetting-resposive-mobile'
            onClick={handleClick_edit_responsive}
          >
            <div><i className="far dth-far fa-edit"></i></div>
            <p>Chỉnh sửa bài viết</p>
          </li>

          <li onClick={handleClick_Delete}>
            <div><i className="far dth-far fa-trash-alt"></i></div>
            <p>Xóa bài viết</p>
          </li>
        </ul >
      }

      {
        isOpenModal &&
        <Modal
          modalProps={modalProp}
          header={header} isEditting={true}
          isEdit={isEdit}
          isRenderFooter={isRenderFooter}
          isLoading={isLoading}
        >
          {isEdit
            ?
            <Upload
              isEdit={isEdit}
              post={post}
              categories_index={categories_index}
              handleCloseModal={handleCloseModal}
              setIsOpenModal={setIsOpenModal}
            />
            :
            isLoadingForEdit
              ?
              <DotLoading />
              : <></>}
        </Modal>
      }
      {isOpenEdit_responsive &&
        < div className='loading-edit-page'>
          <DotLoading />
        </div>}
    </>
  )
}