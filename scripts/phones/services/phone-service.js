import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('/phones.json', callback);
  },

  getPhone(phoneId, callback) {
    // HttpService.sendRequest(`/${phoneId}.json`,  callback);

    let promise = this._sendRequest(`/${phoneId}.json`);
    promise.then(callback)
    setTimeout(() => {
      promise.then((result) => {
        console.log(result);
      })
    }, 1000);
  },

  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],
      _status: 'pending',
      _result: null,

      _resolve(data) {
        this._status = 'fulfilled';
        this._result = data;
        this._successCallbacks.forEach(callback => callback(data));
      },

      then(successCallback) {
        if (this._status === 'fulfilled') {
          successCallback(this._result);
        } else {
          this._successCallbacks.push(successCallback);
        }
      }
    }

    HttpService.sendRequest(url, (data) => {
      promise._resolve(data);
    });

    return promise;
  }
}

export default PhoneService
