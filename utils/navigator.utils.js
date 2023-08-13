export const  navigator = {
  copy(text) {
    window.navigator.clipboard.writeText(text);
  },

  readFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = function(e) {
        console.log(e);
        resolve(e.target.result);
      }
    });
  },

  notify(message) {
    window.alert(message);
  }
}