import api from "./api";


const AuthService = {
  login({
    email,
    password
  }) {
    return api.call().post('/member/login.php', {
      email: email,
      password: password
    })
  },

  register({
    email,
    fullname,
    password,
    repassword
  }) {
    return api.call().post('/member/register.php', {
      email,
      fullname,
      password,
      repassword
    })
  },

  getMeInfo(userid) {
    // console.log('userid trong get me info', userid)
    return api.callWithToken().get('/member/member.php?userid=' + userid)
  },

  updateProfile(formData) {
    return api.callWithToken().post('/member/update.php', formData)
  },

  changePassword({
    oldPassword,
    newPassword,
    reNewPassword
  }) {
    return api.callWithToken().post('/member/password.php', {
      oldPassword,
      newPassword,
      reNewPassword
    })
  }

}

export default AuthService;
