export default (method: string, url: string, data?:any, expectedStatus?: number ) => {

  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data))
    xhr.addEventListener("load", function() {
      if (this.status === expectedStatus) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          error: JSON.parse(xhr.response)
        });
      }
    });
    xhr.addEventListener("error", function() {
      reject({
        status: this.status,
        error: JSON.parse(xhr.response)
      });
    });
  });
};
