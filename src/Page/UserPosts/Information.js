import { useSelector } from "react-redux";

import DotLoading from '../../components/common/Loading/DotLoading'

export default function Information({ totalPosts,
  userId: slugUserId,
  loading
}) {
  const currUser = useSelector(state => state.Auth.currentUser);
  const currUserId = currUser?.USERID
  const displayUserSetting = currUserId === slugUserId ? true : false

  const userData = useSelector(state => state.Auth.userData);


  const defaultAvatar = userData?.profilepicture || 'https://i.kym-cdn.com/entries/icons/facebook/000/017/666/avatar_default_big.jpg'

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
                    <span> {userData?.fullname} </span>
                  </div>

                  {/* Desc */}
                  <div className="ass1-head-user__desc">
                    <p>{userData?.description}</p>
                  </div>

                  {/* statistic infor*/}
                  <div className="ass1-head-user__info-statistic">
                    <div className="ass1-btn-icon"><i className="icon-Post" /><span>Bài viết: {totalPosts} </span></div>
                    <div className="ass1-btn-icon"><i className="icon-Followers" /><span>Theo dõi: {userData?.profileviews}</span></div>
                    <div className="ass1-btn-icon"><i className="icon-Following" /><span>Đang theo dõi: {userData?.youviewed}</span></div>
                    {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
                  </div>

                  {/* Follow button */}
                  <div className="ass1-head-user__btn-follow-wrapper" >
                    {
                      !displayUserSetting && <a href="/" className="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
                    }
                    <a href="profile.html" className="ass1-head-user__btn-follow ass1-btn">Profile</a>
                    {
                      displayUserSetting && <a href="thay-doi-password.html" className="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</a>
                    }
                  </div>
                </div>
              </div>
            </>
        }


      </div>
    </div>
  )
}


