import ajax from "./ajax";

export const getImageBase64Request = async (data: any) => {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/images/getbase64", true);
    xhr.send(data);
    xhr.addEventListener("load", function() {
      if (this.status === 200) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          error: xhr.response
        });
      }
    });
    xhr.addEventListener("error", function() {
      reject({
        status: this.status,
        error: xhr.response
      });
    });
  });
};

export const addImagesRequest = async (images: Array<string>) =>
  await ajax("POST", "/api/images", { images }, 201);

export const removeImageRequest = async (id: string) =>
  await ajax("DELETE", `/api/images/${id}`, undefined, 204);
