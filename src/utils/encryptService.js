import envEndpoint from './envEndpoint'
import CryptoJS from 'crypto-js'

const KEY = envEndpoint.encKey
export default {
  encrypt: (data) => {
    return CryptoJS.AES.encrypt(data, KEY).toString()
  },
  decrypt: (text) => {
    return CryptoJS.AES.decrypt(text, KEY).toString(CryptoJS.enc.Utf8)
  },
}
