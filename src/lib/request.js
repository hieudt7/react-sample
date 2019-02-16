import config from "config/app.js";
import cookie from 'js-cookie';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  return response;
  /*if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;*/
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, method, options) {
  //get token from param
  //let params = new URLSearchParams(document.location.search.substring(1))
  //let token = params.get("token")
  var initOptions = {
    method: method !== undefined ? method : 'GET',
    headers: {
       'X-CSRFToken': cookie.get('csrftoken')
      // 'token': token
    },
    credentials: 'include'
  }
  var opts = Object.assign(initOptions, options);

  if(url.indexOf("http") > -1) {
    url = url;
  } else {
    url = config.apiUrl + url;
  }

  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON);
}
