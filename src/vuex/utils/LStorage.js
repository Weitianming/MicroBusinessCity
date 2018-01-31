/**
 * 本地缓存
 */
const ls = window.localStorage

export default {
  getItem (key) {
    try {
      return ls.getItem(key)
    } catch (err) {
      return ''
    }
  },
  setItem (key, val) {
    ls.setItem(key, val)
  },
  removeItem (key) {
    ls.removeItem(key)
  }
}
