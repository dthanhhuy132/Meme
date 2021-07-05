import { ACT_FETCH_ME_INFO, ACT_LOGIN, ACT_LOGOUT, ACT_UPDATE_USER_INFO, GET_USER_INFO } from "./action";

const initState = {
  currentUser: null,
  userData: null
  // token: localStorage.getItem(TOKEN_KEY)
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_ME_INFO || ACT_LOGIN:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      }

    case ACT_LOGIN:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      }

    case GET_USER_INFO:
      return {
        ...state,
        userData: action.payload.userData
      }
    case ACT_LOGOUT:
      return {
        currentUser: null,
        userData: null
      }
    case ACT_UPDATE_USER_INFO:
      console.log('action.payload.currentUserUpdate', action.payload.currentUserUpdate)
      return {
        ...state,
        currentUser: action.payload.currentUserUpdate
      }

    default:
      return state;
  }
}