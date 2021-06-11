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
    console.log('userid getMeinfo', userid)
    console.log(api.callWithToken().get('/member/member.php', {
      userid: userid,
    }))
    return api.callWithToken().get('/member/member.php', {
      userid: userid,
    })
  }
}




export default AuthService;
