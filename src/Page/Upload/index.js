import './Upload.css'

import { useState, useEffect } from 'react';
import { actPostNewPostAsync, editPostAsync } from '../../store/posts/action';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

// antdesign:
import { notification } from 'antd';

import CategoriesAndPostBtn from './CategoriesAndPostBtn';
import { motion } from 'framer-motion'

let editData = {}
export default function Upload({
  isEdit = false,
  post,
  categories_index,
  handleCloseModal,
  closeModal = () => { },
  setIsOpenModal = () => { },
  goBack = () => { }
}) {

  const dispatch = useDispatch();
  const [warningPicture, setWarningPicture] = useState(false);
  const [warningDesc, setWarningDesc] = useState(false);
  const [waningLinkImg, setWarningLinkImg] = useState(false);

  const [uploadPictureRev, setUploadPictureRev] = useState(null);
  const [formData, setFormData] = useState({
    obj_image: '',
    url_image: '',
    post_content: '',
    category: '',
  })
  const history = useHistory();

  useEffect(() => {
    if (isEdit) {
      setFormData({
        obj_image: '',
        url_image: post?.url_image,
        post_content: post?.post_content,
        category: ''
      })
      setUploadPictureRev(post?.url_image)
    }

    editData['url_image'] = post?.url_image;
    editData['post_content'] = post?.post_content;
    // eslint-disable-next-line
  }, [isEdit])

  /// ________________________________________________________________________________________ Clear Memory leak
  // useEffect(() => {
  //   let unmount = true;
  //   return () => unmount = false;
  // })
  /// ________________________________________________________________________________________ FUNCTION PREPARE DATA
  function handleChange_url_image(e) {
    setFormData({
      ...formData,
      url_image: e.target.value,
      obj_image: '',
    })
    setUploadPictureRev(e.target.value)
    if (e.target.value !== editData.url_image) setIsEdited(false) //__________________________EditData
    else setIsEdited(false)

    setWarningPicture(false)
    if (e.target.value === '') setWarningLinkImg(false)
  }

  function handleClick_upload(e) {
    e.preventDefault()
    let inputEl = document.querySelector('.js-input-file');
    inputEl.click()
  }

  function handleOnChangeInput(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      url_image: '',
      obj_image: file
    })
    if (formData.obj_image !== '') setIsEdited(false) //__________________________EditData
    else setIsEdited(false)


    setWarningPicture(false)

    const reader = new FileReader();
    reader.onload = function (e) {
      setUploadPictureRev(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  function handleRemoveBackground() {
    setFormData({
      ...formData,
      url_image: '',
      obj_image: ''
    })
    setUploadPictureRev(null)
  }

  function handleInputDecs(e) {
    setFormData({
      ...formData,
      post_content: e.target.value
    })
    if (e.target.value !== editData.post_content) setIsEdited(false) ///______________________EditData
    else setIsEdited(true)
  }

  /// ________________________________________________________________________________________ FUNCTION POST A NEW POST
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(true) //________________ Props for edit

  let formDataFinal = new FormData();
  formDataFinal.append('obj_image', formData.obj_image)
  formDataFinal.append('url_image', formData.url_image)
  formDataFinal.append('post_content', formData.post_content)
  formDataFinal.append('category', formData.category)
  isEdit && formDataFinal.append('postid', post?.PID)

  // ____________________________________________________________ EDIT POST A NEW POST FOR EDIT
  const location = useLocation();
  const searchPage = location.pathname.indexOf('/search') !== -1;

  function postEditPost() {
    setIsLoading(true)
    dispatch(
      editPostAsync(formDataFinal)
    ).then(res => {
      if (res.ok) {
        setIsLoading(false);
        setIsOpenModal();
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Ố là la!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
          searchPage && history.push('/profile');
          goBack();
        })('Yeah, Bài viết đã thay đổi thành công')
      } else {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "Ối ồi, kiểm tra lại bạn nhé!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Thay đổi bài viết thất bại')
      }
    })
  }

  // ___________________ POST A NEW POST FOR UPLOAD
  function postANewPost() {
    setIsLoading(true)
    dispatch(
      actPostNewPostAsync(formDataFinal)
    ).then(res => {
      if (res.ok) {
        setIsLoading(false);
        closeModal();
        setFormData({
          obj_image: '',
          url_image: post?.url_image || '',
          post_content: post?.post_content || '',
          category: '',
        });
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Cùng vô bình luận chém gió nao bạn ơi!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
          history.push('/')
        })('Yeah, Ảnh đã đăng thành công')

      } else {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "Chỉnh sửa lại một chút rôi đăng ảnh nào",
            className: 'dth-background-notification',
            duration: 4,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          })
        })('Ố ồ, đăng ảnh thất bại =)))')
      }
    });
  }
  /// ________________________________________________________________________________________ PASS PROPS TO CATEGORY
  let propsPass = {
    formData,
    setFormData,

    warningDesc,
    setWarningDesc,

    warningPicture,
    setWarningPicture,

    postANewPost,
    postEditPost,

    isLoading,
    setIsLoading,

    // prop for edit
    isEdited,
    setIsEdited
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let path = location.pathname;
  const uploadMotionVariants = path !== '/upload' ? {} : {
    initial: { y: '100vh' },
    animate: {
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      y: '100vh',
      transition: {
        duration: 0.3
      }
    }
  }



  return (
    <motion.main
      variants={uploadMotionVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className="container dth-upload">
        {/*sections*/}
        <div className="row">
          <div className="col-lg-12">
            {/*section*/}
            <div className="ass1-section ass1-section__edit-post">
              <div className="ass1-section__content" style={{
                'paddingBottom': '10px'
              }}>
                <form action="#">
                  < div className="form-group btn-meme-link-warapper">
                    <input
                      type="text"
                      className="form-control ttg-border-none dth-input-linkMeme"
                      placeholder="Link hình ảnh: https://..."
                      value={formData.url_image}
                      onChange={handleChange_url_image}
                    />

                    <a href="https://giphy.com/"
                      target='_blank'
                      rel="noreferrer"
                      className="ass1-btn ass1-btn-meme"
                    >GRIPHY</a>
                  </div>
                  {waningLinkImg &&
                    <p className='warning-link-img'>Đường dẫn phải kết thúc bằng ký tự <span>'.gif ', '.png', 'jpg'</span></p>
                  }
                </form>

                <div className="ass1-section__image dth-upload-img">
                  {uploadPictureRev === null || uploadPictureRev === ''
                    ?
                    <>
                      <div className="ass1-section__image__subClass" onClick={handleClick_upload}>
                        <p className='dth-addBtn-desc'>Hoặc</p>
                        <p className='dth-addBtn-desc'>Click vào đây để tải ảnh từ máy tính</p>
                        <i className="fas fa-plus dth-fa-plus" ></i>
                      </div>
                    </>
                    :
                    <div className='dth-upload-img_close'>
                      <img src={uploadPictureRev} alt="default" />
                      <div className='close-btn-background' onClick={handleRemoveBackground}>
                        <i className="fas fa-times dth-fa-times__upload"></i>
                      </div>
                    </div>
                  }
                </div>
                {
                  warningPicture &&
                  <p className='warning-img'>Chưa có hình nè Friend, dán link ảnh hoặc tải lên từ máy tính nhé</p>
                }

                <form>
                  <div className="form-group dth-form-group_upload dth-margin-bottom-description">
                    <textarea
                      type="text"
                      className="form-control ttg-border-none"
                      placeholder="Mô tả ..."
                      value={formData.post_content}
                      onChange={handleInputDecs}
                      onInput={(e) => setWarningDesc(false)}
                    />
                  </div>
                </form>
                <input type="file" className="js-input-file d-none" onChange={handleOnChangeInput} />
                {
                  warningDesc &&
                  <div className='warning-description'>
                    <p>Nhập mô tả nè bạn hiền?</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <CategoriesAndPostBtn
            propsPass={propsPass}
            categories_index={categories_index}
            isEdit={isEdit}
            handleCloseModal={handleCloseModal} />
        </div>
      </div >
    </motion.main >
  )
}