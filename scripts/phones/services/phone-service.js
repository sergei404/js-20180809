import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('/phones.json', callback);
  },

  getPhone(phoneId, callback) {
    // HttpService.sendRequest(`/${phoneId}.json`,  {
    //   errorCallback: () => {},
    //   successCallback: callback,
    // });
    let promise = this._sendRequest(`/${phoneId}.json`);
    promise.then(callback)
    promise.then((result) => {
      console.log(result);
    })
  },

  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],

      _resolve(data) {
        this._successCallbacks.forEach(callback => callback(data));
      },

      then(successCallback) {
        this._successCallbacks.push(successCallback);
      }
    }

    HttpService.sendRequest(url, (data) => {
      promise._resolve(data);
    });

    return promise;
  }
}

export default PhoneService
