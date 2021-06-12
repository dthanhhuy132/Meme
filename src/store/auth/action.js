import AuthService from "../../service/auth";


export const TOKEN_KEY = 'token';
export const USER_ID = 'id'

export const ACT_FETCH_ME_INFO = 'ACT_FETCH_ME_INFO';
export const ACT_LOGIN = 'ACT_LOGIN';
// export const ACT_REGISTER = 'ACT_REGISTER'


//////////////// Login function

export function actLogin(currentUser) {
  console.log('currentUser trong login', currentUser)
  return {
    type: ACT_LOGIN,
    payload: {
      currentUser
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
      const token = res.data.token

      dispatch(actLogin(res.data.user))
      localStorage.setItem(TOKEN_KEY, token)
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

/////////// Auto login function
export function actFetchMeInfo(currentUser) {
  return {
    type: ACT_FETCH_ME_INFO,
    payload: {
      currentUser
    }
  }
}

export function actFechMeInfoAsync(userId) {
  return async dispatch => {
    try {
      const res = await AuthService.getMeInfo(userId);

      dispatch(actFetchMeInfo(res.data.user))
    } catch (err) {
      console.log('that cmnr bai')
    }
  }
}


//////////////////// Register function
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