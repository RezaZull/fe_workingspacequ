import encryptService from './encryptService'

const localStorageKey = {
  authData: 'auth',
  jwtToken: 'jwt',
  user: 'user',
}

const localStorageService = {
  getData: (key) => {
    let data = localStorage.getItem(key)
    if (data === null) {
      return null
    }
    return JSON.parse(encryptService.decrypt(data))
  },
  setData: (key, data) => {
    return localStorage.setItem(key, encryptService.encrypt(JSON.stringify(data)))
  },
  removeData: (key) => {
    return localStorage.removeItem(key)
  },
}

export { localStorageKey, localStorageService }
