import { useSelector } from "react-redux";

export default function Information({ totalPosts, userId: slugUserId }) {
  const currUser = useSelector(state => state.Auth.currentUser);
  const currUserId = currUser?.USERID
  const displayUserSetting = currUserId === slugUserId ? true : false


  const userData = useSelector(state => state.Auth.userData);
  // USERID: "404"
  // description: "Haha"
  // email: "aehole37@gmail.com"
  // fullname: "Lê Minh Thủy"
  // gender: "nam"
  // lastlogin: ""
  // password: ""
  // permission: "member"
  // profilepicture: "http://api-meme-zendvn-01.herokuapp.com/public/user/404/received_931143837725044.jpeg"
  // profileviews: "0"
  // status: "1"
  // username: ""
  // yourviewed: "0"
  // youviewed: "0"

  const defaultAvatar = userData?.profilepicture || 'http://img.thehobbyblogger.com/2012/08/custom-avatar.png'

  return (
    <div className="ass1-head-user">
      <div className="ass1-head-user__content">
        <div className="ass1-head-user__image"><a href="/"><img src={defaultAvatar} alt="" /></a></div>
        <div className="ass1-head-user__info">
          <div className="ass1-head-user__info-head">
            <div className="ass1-head-user__name">
              <span> {userData?.fullname} </span>
              <i><img src="fonts/emotion/svg/Verified.svg" alt="" /></i>
            </div>
            <div className="w-100" />
            <a href="/" className="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>

            {
              displayUserSetting && <a href="thay-doi-password.html" className="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</a>
            }

            <a href="profile.html" className="ass1-head-user__btn-follow ass1-btn">Profile</a>
            {/* <a href="/" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> */}
          </div>
          <div className="ass1-head-user__info-statistic">
            <div className="ass1-btn-icon"><i className="icon-Post" /><span>Bài viết: {totalPosts} </span></div>
            <div className="ass1-btn-icon"><i className="icon-Followers" /><span>Theo dõi: {userData?.profileviews}</span></div>
            <div className="ass1-btn-icon"><i className="icon-Following" /><span>Đang theo dõi: {userData?.youviewed}</span></div>
            {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
          </div>
          <p>{userData?.description}</p>
        </div>
      </div>
    </div >
  )
}