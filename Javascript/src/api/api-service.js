export default class ApiService {
    #endPoint = '';

    constructor(endPoint) {
      this.#endPoint = endPoint;
    }
  
    async _load({
      url,
      method = 'GET',
      body = null,
      headers = new Headers(),
    }) {
  
      const response = await fetch(
        `${this.#endPoint}/${url}`,
        {method, body, headers},
      );
  
      try {
        ApiService.checkStatus(response);
        return response;
      } catch (err) {
        ApiService.catchError(err);
      }
    }
  
  
    static parseResponse(response) {
      return response.json();
    }
  
    static checkStatus(response) {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }
  
    static catchError(err) {
      throw err;
    }
  
    static setLocalStorage(response, name) {
      localStorage.setItem(name, JSON.stringify(response));
      let resp = JSON.parse(localStorage.getItem(name));
      return resp;
    }
  
    static getLocalStorage(name) {
      let resp = JSON.parse(localStorage.getItem(name));
      return resp;
    } 
  }
  