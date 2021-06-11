import AuthService from "../../service/auth";


export const TOKEN_KEY = 'token';
export const USER_ID = 'id'

export const ACT_FETCH_ME_INFO = 'ACT_FETCH_ME_INFO';
export const ACT_LOGIN = 'ACT_LOGIN';
// export const ACT_REGISTER = 'ACT_REGISTER'


export function actFetchMeInfo(currentUser) {
  return {
    type: ACT_FETCH_ME_INFO,
    payload: {
      currentUser
    }
  }
}

export function actLogin(currentUser) {
  return {
    type: ACT_LOGIN,
    payload: {
      currentUser
    }
  }
}



/////////// Async function


export function actFechMeInfoAsync(userId) {
  return async dispatch => {
    try {
      const res = await AuthService.getMeInfo(userId)

    } catch (err) {
      console.log('that cmnr bai')
    }
  }
}

export function actLoginAsync({
  email,
  password
}) {
  return async dispatch => {
    try {
      const res = await AuthService.login({
        email,
        password
      })

      const userId = res.data.user.USERID

      dispatch(actLogin(res.data))
      return {
        ok: true,
        data: res.data
      }
    } catch (e) {
      return {
        ok: false
      }
    }
  }
}

export function actRegisterAsync({
  email,
  fullname,
  password,
  repassword
}) {
  return async dispatch => {
    try {
      const res = await AuthService.register({
        email,
        fullname,
        password,
        repassword
      })

      console.log('res trong register', res)
      const token = res.data.token;
      const userId = res.data.user.USERID
      localStorage.setItem(TOKEN_KEY, token);

      dispatch(actFechMeInfoAsync(userId))

      if (res.data.error) {
        return {
          ok: res.data.error
        }
      }

      return {
        ok: 'true'
      }


    } catch (e) {
      return {
        ok: false
      }
    }
  }
}