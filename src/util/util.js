export default {
  fetch(key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  save(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  IsDebug(){
    if(location.origin.indexOf("192.168")>0){
      return true;
    }else{
      return false;
    }
  }
}
