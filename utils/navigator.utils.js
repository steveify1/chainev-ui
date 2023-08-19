export const  navigator = {
  copy(text) {
    window.navigator.clipboard.writeText(text);
  },

  readFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = function(e) {
        resolve(e.target.result);
      }
    });
  },

  notify(message) {
    window.alert(message);
  },

  localStorage: {
    get(name) {
      return window.localStorage.getItem(name);
    },
    set(name, value) {
      return window.localStorage.setItem(name, value);
    },
    remove(name) {
      return window.localStorage.removeItem(name);
    },
  },
}