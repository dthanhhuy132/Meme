import './EditProfile.css';

import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actUpdateUserInfoAsync } from '../../store/auth/action';

import DotLoading from '../common/Loading/DotLoading';
import Loading from '../common/Loading';

// antdesign:
import { notification } from 'antd';

let initCurrUser = {}
export default function EditProfile({ setIsOpenModal }) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  // console.log('currentUser trong update info', currentUser)

  const [userInfo, setUserInfo] = useState({
    fullname: '',
    description: '',
    gender: '',
    avatar: ''
  });

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      fullname: currentUser.fullname,
      description: currentUser.description,
      gender: currentUser.gender === 'nam' ? 'nam' : currentUser.gender === '' ? '' : 'nữ',
      avatar: currentUser.profilepicture
    })
    setAvatar(currentUser.profilepicture)
    let optionsEl = document.querySelectorAll("select[class='form-control'] option");
    optionsEl.forEach(option => {
      if (option.innerText.toLowerCase() === currentUser.gender) option.selected = true;
    })
    initCurrUser = currentUser;
    // eslint-disable-next-line
  }, [])

  // console.log('userInfo', userInfo)

  const [avatar, setAvatar] = useState('');
  const defaultAvatar = 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg';
  if (!avatar) setAvatar(defaultAvatar)

  // _______________________________________________________________________________________INPUT FILE
  const [isAvatarChange, setIsAvatarChange] = useState(false)
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)

  function handleClickUpload(e) {
    let inputFileEL = document.querySelector('.dth-input-Profile')
    inputFileEL.click()
  }

  function handleInputFile(e) {
    const file = e.target.files[0]
    setIsLoadingAvatar(true);
    if (!file) return;
    file ? setIsAvatarChange(true) : setIsAvatarChange(false);
    setUserInfo({
      ...userInfo,
      avatar: file
    })

    let reader = new FileReader()
    reader.onload = function (e) {
      setAvatar(e.target.result);
      setIsLoadingAvatar(false)

    }
    reader.readAsDataURL(file)
  }


  // _______________________________________________________________________________________NAME
  const [isNameChange, setIsNameChange] = useState(false)

  function handleInputName(e) {
    setUserInfo({
      ...userInfo,
      fullname: e.target.value
    })

  }
  useEffect(() => {
    userInfo.fullname !== initCurrUser.fullname && userInfo.fullname !== ''
      ? setIsNameChange(true)
      : setIsNameChange(false)
    // eslint-disable-next-line
  }, [userInfo.fullname.length])


  // _______________________________________________________________________________________GENDER
  const [isGenderChange, setIsGenderChange] = useState(false);

  function handleInputGender(e) {
    if (e.target.value === '1') setUserInfo({
      ...userInfo,
      gender: 'nam'
    })
    if (e.target.value === '0') setUserInfo({
      ...userInfo,
      gender: 'nữ'
    })
  }

  useEffect(() => {
    userInfo.gender === initCurrUser.gender ? setIsGenderChange(false) : setIsGenderChange(true);
    // eslint-disable-next-line
  }, [userInfo.gender])

  // _______________________________________________________________________________________DECS
  const [isChangeDesc, setIsChangeDesc] = useState(false)
  function handleInputDesc(e) {
    setUserInfo({
      ...userInfo,
      description: e.target.value
    })
  }

  useEffect(() => {
    userInfo.description !== currentUser.description && userInfo.description !== ''
      ? setIsChangeDesc(true)
      : setIsChangeDesc(false)
    // eslint-disable-next-line
  }, [userInfo.description.length])

  // _______________________________________________________________________________________Stop memory leak

    // useEffect(() => {
    //   let unmount = true;
    //   return () => { unmount = false }
    // })

  // _______________________________________________________________________________________UPDATE INFO

  let formData = new FormData()
  formData.append('fullname', userInfo.fullname);
  formData.append('description', userInfo.description);
  formData.append('gender', userInfo.gender);
  formData.append('avatar', userInfo.avatar);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  function handleUpdateInfo(e) {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      actUpdateUserInfoAsync(formData)
    ).then(res => {
      console.log('res trong dispatch action', res)
      if (res.ok) {
        setIsLoading(false);
        setIsOpenModal(false);//close modal

        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "Cập nhật thông tin thành công",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Yeah!!!');
        
        setIsLoading(false);

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
        })('Cập nhật thông tin thất bại')
      }
    })
  }

  let name_description_emty = userInfo.fullname !== '' && userInfo.description !== ''
  let isChange = isAvatarChange || isNameChange || isGenderChange || isChangeDesc;
  let isDataOk = isChange && name_description_emty;
  const btnClasses = classNames('ass1-btn', {
    'dth-editProfile-disable': isDataOk === false
  })

  return (
    <div className='ass1-login'>
      <div className="ass1-login__content">
        <div className="ass1-login__form">

          <div className="avatar">
            {!isLoadingAvatar
              ?
              <>
                <img src={avatar} alt="" />
                <i className="fas fa-upload dth-upload-editProfile" onClick={handleClickUpload}></i>
              </>
              :
              <div className='avatar-loading'>
                <DotLoading />
              </div>
            }
          </div>

          <form action="/">
            <input
              type="text"
              className="form-control"
              placeholder="Tên ..."
              value={userInfo.fullname}
              onChange={handleInputName}
            />

            <select className="form-control" onChange={handleInputGender} defaultValue={''}>
              <option value='' style={{ display: 'none' }}>Giới tính</option>
              <option value={1} >Nam</option>
              <option value={0} >Nữ</option>
            </select>

            <input
              type="file"
              name="avatar"
              placeholder="Ảnh đại diện"
              className="form-control dth-input-Profile"
              onChange={handleInputFile}
            />
          </form>

          <form action='/'>
            <textarea
              className="form-control dth-profile-desc"
              placeholder="Mô tả ngắn ..."
              value={userInfo.description}
              onChange={handleInputDesc}
            />
            <div className="ass1-login__send justify-content-center">
              <button
                type="submit"
                className={btnClasses}
                onClick={handleUpdateInfo}
              >
                {isLoading && <Loading />}
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}