import HttpService from '../../common/services/http-service.js';

class MyPromise {
  constructor(behaviorFunction) {
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._status = 'pending';
    this._result = null;

    behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;
    this._successCallbacks.forEach(callback => callback(data));
  }

  then(successCallback, errorCallback = () => {}) {
    if (this._status === 'fulfilled') {
      successCallback(this._result);
    } else if (this._status === 'rejected') {
      errorCallback(this._result);
    } else {
      this._successCallbacks.push(successCallback);
      this._errorCallbacks.push(errorCallback);
    }
  }

  catch(errorCallback) {
    if (this._status === 'rejected') {
      errorCallback(this._result);
    } else {
      this._errorCallbacks.push(errorCallback);
    }
  }

  _reject(error) {
    this._status = 'rejected';
    this._result = error;

    this._errorCallbacks.forEach(callback => {
      callback(error);
    })
  }
}

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('/phones.json', callback);
  },

  getPhone(phoneId, callback) {
    // HttpService.sendRequest(`/${phoneId}.json`,  callback);

    let promise = this._sendRequest(`/${phoneId}.json`);
    promise.then(callback, (error) => { console.error(error); });
    promise.catch((error) => { console.log('catched error:', error); });
    setTimeout(() => {
      promise.then((result) => {
        console.log(result);
      })
    }, 1000);
  },

  _sendRequest(url) {
    let promise = new MyPromise((resolve, reject) => {
      HttpService.sendRequest(url, resolve, reject);
    });

    return promise;
  }
}

export default PhoneService
