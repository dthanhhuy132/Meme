import axios from 'axios';
import { TOKEN_KEY } from '../store/auth/action';

const baseURL = 'http://api-meme-zendvn-01.herokuapp.com/api'

const api = {
  call() {
    return axios.create({
      baseURL
    })
  },

  callWithToken() {
    return axios.create({
      baseURL,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
      }
    })
  }
}



export default api;
