import { ACT_FETCH_ME_INFO, ACT_LOGIN, GET_USER_INFO, TOKEN_KEY } from "./action";



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

    default:
      return state;
  }
}