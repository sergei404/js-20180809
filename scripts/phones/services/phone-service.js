import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getPhones({ query = '', orderField = '' } = {}) {
    return HttpService.sendRequest('/phones.json').then(phones => {
        let filteredPhones = this._filter(phones, query);
        let sortedPhones = this._sort(filteredPhones, orderField);

        return sortedPhones;
      });
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`/${phoneId}.json`);
  },

  _filter(phones, query) {
    return phones;
  },

  _sort(phones, orderField) {
    return phones;
  }
}

export default PhoneService
















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
