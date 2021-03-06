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
      setUploadPictureRev(post.url_image)
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
  isEdit && formDataFinal.append('postid', post.PID)

  // ____________________________________________________________ EDIT POST A NEW POST FOR EDIT
  const location = useLocation();
  const searchPage = location.pathname.indexOf('/search') !== -1;
  console.log('searchPage laf chuan', searchPage)

  function postEditPost() {
    console.log('run ham dispatch edit')
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
            description: "??? l?? la!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
          searchPage && history.push('/profile');
          goBack();
        })('Yeah, B??i vi???t ???? thay ?????i th??nh c??ng')
      } else {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "???i ???i, ki???m tra l???i b???n nh??!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Thay ?????i b??i vi???t th???t b???i')
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
            description: "C??ng v?? b??nh lu???n ch??m gi?? nao b???n ??i!!!",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
          history.push('/')
        })('Yeah, ???nh ???? ????ng th??nh c??ng')

      } else {
        setIsLoading(false);
        (function openNotification(placement) {
          notification.error({
            message: `${placement}`,
            description: "Ch???nh s???a l???i m???t ch??t r??i ????ng ???nh n??o",
            className: 'dth-background-notification',
            duration: 4,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          })
        })('??? ???, ????ng ???nh th???t b???i =)))')
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

<<<<<<< HEAD

  const pathname = location.pathname;
  console.log('pathname la gi', pathname)
  let uploadMotionVariant = pathname !== '/upload'
    ?
    {

    }

    : {
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
      variants={uploadMotionVariant}
=======
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
>>>>>>> Final1
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
                      placeholder="Link h??nh ???nh: https://..."
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
                    <p className='warning-link-img'>???????ng d???n ph???i k???t th??c b???ng k?? t??? <span>'.gif ', '.png', 'jpg'</span></p>
                  }
                </form>

                <div className="ass1-section__image dth-upload-img">
                  {uploadPictureRev === null || uploadPictureRev === ''
                    ?
                    <>
                      <div className="ass1-section__image__subClass" onClick={handleClick_upload}>
                        <p className='dth-addBtn-desc'>Ho???c</p>
                        <p className='dth-addBtn-desc'>Click v??o ????y ????? t???i ???nh t??? m??y t??nh</p>
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
                  <p className='warning-img'>Ch??a c?? h??nh n?? Friend, d??n link ???nh ho???c t???i l??n t??? m??y t??nh nh??</p>
                }

                <form>
                  <div className="form-group dth-form-group_upload dth-margin-bottom-description">
                    <textarea
                      type="text"
                      className="form-control ttg-border-none"
                      placeholder="M?? t??? ..."
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
                    <p>Nh???p m?? t??? n?? b???n hi???n?</p>
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