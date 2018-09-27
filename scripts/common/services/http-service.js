const API_URL = 'http://localhost:3000/phones';

const HttpService = {
  sendRequest(url, successCallback, errorCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + url, true);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        errorCallback(new Error('Error'));
        return;
      }

      let responseData = JSON.parse( xhr.responseText );
      successCallback(responseData);
    }

    xhr.onerror = errorCallback;
  }
}

export default HttpService;




function getUser(url, successCallback, errorCallback) {
  HttpService.sendRequest(`api/${url}`, successCallback);
}
function getAccessRights(id, successCallback, errorCallback) {}
function getContent(userId, accessRights, callback, errorCallback) {}

// let user = getUser();
// let accessRights = getAccessRights();

// getUser()
//   .then(user => {
//     return getAccessRights(user.id);
//   })
//   .then(accessRights => {
//     return getContent(user, accessRights);
//   })
//   .then(content => {
//     // ...
//   })
//   .catch(err => {})

// getUser('aasbsa', (user) => {
//   getAccessRights(user.id, (userRights) => {
//     if (!userRights.hasAccessToCOntent) {
//       // redirect
//     }
//     getContent(user, userRights, (content) => {
//
//       loadPageContent(content);
//
//     }, () => {})
//   }, () => {})
// }, {} => {})
