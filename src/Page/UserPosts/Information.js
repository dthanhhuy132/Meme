import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import DotLoading from '../../components/common/Loading/DotLoading';
import Modal from '../../components/Modal';
import EditProfile from '../../components/Author/EditProfile';
import ChangePassword from '../../components/Author/ChangePassword';


export default function Information({
  totalPosts,
  userId: slugUserId,
  loading
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalChangePassword, setIsPOpenModalChangePassword] = useState(false)
  const currUser = useSelector(state => state.Auth.currentUser);
  const location = useLocation();
  const isCurrentUser = location.pathname === '/profile';

  const userData = useSelector(state => state.Auth.userData);
  const defaultAvatar = isCurrentUser ? currUser?.profilepicture : userData?.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

  const currUserId = currUser?.USERID;
  const displayUserSetting = currUserId === slugUserId ? true : false;

  function handleProfileClick(e) {
    e.preventDefault();
    setIsOpenModal(true);
    setIsPOpenModalChangePassword(false);
    setIsOpenModalEdit(true)

  }

  function handleClickChangePassWord(e) {
    e.preventDefault();
    setIsOpenModal(true);
    setIsOpenModalEdit(false)
    setIsPOpenModalChangePassword(true);
  }

  let modalProps = {
    isOpenModal,
    setIsOpenModal
  }

  return (
    <div className="ass1-head-user">
      <div className="ass1-head-user__content">
        {
          loading
            ?
            <DotLoading size='large' />
            :
            <>
              <div className="ass1-head-user__image">
                <a href="/"><img src={defaultAvatar} alt="" /></a>
              </div>

              <div className="ass1-head-user__info">
                <div className="ass1-head-user__info-head">
                  {/* Name */}
                  <div className="ass1-head-user__name">
                    <span> {isCurrentUser ? currUser?.fullname : userData?.fullname} </span>
                  </div>

                  {/* Desc */}
                  <div className="ass1-head-user__desc">
                    <p>{isCurrentUser ? currUser?.description : userData?.description}</p>
                  </div>

                  {/* statistic infor*/}
                  <div className="ass1-head-user__info-statistic">
                    <div className="ass1-btn-icon">
                      <i className="icon-Post" />
                      <span>Bài viết: {totalPosts} </span>
                    </div>

                    <div className="ass1-btn-icon">
                      <i className="icon-Followers" />
                      <span>Theo dõi: {isCurrentUser ? currUser?.profileviews : userData?.profileviews}</span>
                    </div>

                    <div className="ass1-btn-icon">
                      <i className="icon-Following" />
                      <span>Đang theo dõi: {isCurrentUser ? currUser?.youviewed : userData?.youviewed}</span>
                    </div>
                  </div>

                  {/* Follow button */}
                  <div className="ass1-head-user__btn-follow-wrapper" >
                    {
                      !displayUserSetting && <a href="/" className="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
                    }
                    <a className="ass1-head-user__btn-follow ass1-btn" onClick={handleProfileClick}>Cập nhật thông tin</a>
                    {
                      displayUserSetting &&
                      <a href="thay-doi-password.html"
                        className="ass1-head-user__btn-follow ass1-btn"
                        onClick={handleClickChangePassWord}
                      >Đổi mật khẩu</a>
                    }
                  </div>
                </div>
                {isOpenModal && isOpenModalEdit &&
                  <Modal modalProps={modalProps} isRenderFooter={false} header='Chỉnh sửa thông tin cá nhân'>
                    <EditProfile setIsOpenModal={setIsOpenModal} />
                  </Modal>}
                {isOpenModal && isOpenModalChangePassword &&
                  <Modal modalProps={modalProps} isRenderFooter={false} header='Thay đổi mật khẩu'>
                    <ChangePassword setIsPOpenModalChangePassword={setIsPOpenModalChangePassword} />
                  </Modal>}
              </div>
            </>
        }


      </div>
    </div>
  )
}

