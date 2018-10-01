// const API_URL = 'https://stasgavrylov.github.io/js-20180809/phones/';
const API_URL = 'http://localhost:3000/phones';


const HttpService = {
  sendRequest(url) {
    return fetch(API_URL + url)
      .then(response => response.json());
    // return new Promise((resolve, reject) => {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open('GET', API_URL + url, true);
    //   xhr.send();
    //
    //   xhr.onload = () => {
    //     if (xhr.status !== 200) {
    //       reject(new Error('Error'));
    //       return;
    //     }
    //
    //     let responseData = JSON.parse( xhr.responseText );
    //     resolve(responseData);
    //   }
    //
    //   xhr.onerror = reject;
    // })
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
