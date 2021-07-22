import AuthService from "../../service/auth";


export const TOKEN_KEY = 'token';
export const USER_ID = 'id'

export const ACT_FETCH_ME_INFO = 'ACT_FETCH_ME_INFO';
export const ACT_LOGIN = 'ACT_LOGIN';
export const GET_USER_INFO = 'GET_USER_INFO';
// export const ACT_REGISTER = 'ACT_REGISTER'
export const ACT_LOGOUT = 'ACT_LOGOUT';
export const ACT_UPDATE_USER_INFO = 'ACT_UPDATE_USER_INFO';


//////////////// Login function

export function actLogin(currentUser) {
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
      const token = res.data.token;
      dispatch(actLogin(res.data.user))
      localStorage.setItem(TOKEN_KEY, token)

      return {
        ok: true,
        data: res.data
      }
    } catch (e) {
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

      if (res.data.error) {
        return {
          error: res.data.error
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

////// Get userInfor
export function actGetUserInfo(userData) {
  // console.log('userData moi', userData)
  return {
    type: GET_USER_INFO,
    payload: {
      userData
    }
  }
}

export function actGetUserInfoAsync(userid) {
  return async dispatch => {
    try {
      const res = await AuthService.getMeInfo(userid);
      const userData = res.data.user;
      dispatch(actGetUserInfo(userData));

      return {
        ok: true,
        userData
      }
    } catch (er) {
      return {
        ok: false
      }
    }
  }
}


// -------------LOGOUT-------
export function actLogout() {
  return {
    type: ACT_LOGOUT,
  }
}



// ______________________________________________________ Edit and update userInfo
export function actUpdateUserInfo(currentUserUpdate) {
  return {
    type: ACT_UPDATE_USER_INFO,
    payload: {
      currentUserUpdate
    }
  }
}

export function actUpdateUserInfoAsync(formData) {
  return async dispatch => {
    try {
      const res = await AuthService.updateProfile(formData);
      const currentUserUpdate = res.data.user;

      dispatch(actUpdateUserInfo(currentUserUpdate))
      return {
        ok: true,
      }
    } catch (er) {
      return {
        ok: false,
      }
    }
  }
}

// ______________________________________________________ Change password
export function actChangePasswordAsync({
  oldPassword,
  newPassword,
  reNewPassword
}) {
  return async dispatch => {
    try {
      const res = await AuthService.changePassword({
        oldPassword,
        newPassword,
        reNewPassword
      })

      return {
        ok: true,
        data: res
      }

    } catch (err) {
      return {
        ok: false
      }
    }
  }
}

