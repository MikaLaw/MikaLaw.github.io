export const Model = {
  login(appId, perms) {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: appId,
      });
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          reject(new Error("Не удалось авторизоваться"));
        }
      }, perms);
    });
  },
  callApi(method, params) {
    params.v = params.v || "5.81";
    params.user_id = 1078452;
    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },
  getFriends(params = {}) {
    return this.callApi("friends.get", params);
  },
  saveFriends(data) {
    localStorage.setItem("friends", JSON.stringify(data));
    alert("Данные сохранены!");
  },
};
