// Dependencies
import queryString from 'query-string';

// Config
import config from 'app-config';

export function apiFetch(endpoint, options = {}, query = false, jsonResponse = true) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async() => {
    try {
      const fetchOptions = apiOptions(options);
      const fetchEndpoint = apiEndpoint(endpoint, qs);
      const response = await fetch(fetchEndpoint, fetchOptions);
      if(jsonResponse)
        return response.json();
      return response.text();
    } catch (e) {
      throw e;
    }
  };

  return getPromise();
}

export function apiEndpoint(endpoint, qs) {
  let query = '';

  if (qs) {
    query = `?${qs}`
  }

  return `${!/http/i.test(endpoint) ? config.api.url : ''}${endpoint}${query}`;
}

export function apiOptions(option = {}) {
  const {
    method = 'GET',
    headers = {
      "Accept": "application/json",
      'Content-type': 'application/json',
    },
    body = false
  } = option;

  const newOptions = {
    method,
    headers,
    //credentials: 'include',
    //mode: 'no-cors'
  };

  if (body) {
    newOptions.body = JSON.stringify(body);
  }

  return newOptions;
}
