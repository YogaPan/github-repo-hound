const API_URL = "https://api.github.com/";

class GithubAPI {
  static get = (url) => new GithubAPI(url, "GET");
  static post = (url) => new GithubAPI(url, "POST");
  static put = (url) => new GithubAPI(url, "PUT");
  static delete = (url) => new GithubAPI(url, "DELETE");

  static searchRepo = (qualifiers) =>
    GithubAPI.get("/search/repositories").param("q", qualifiers);

  constructor(path, method) {
    this.url = new URL(path, API_URL).toString();
    this.method = method || "GET";
    this.urlParams = {};
    this.headers = {};
    this.body = undefined;
  }

  headers(data) {
    this.headers = data;
    return this;
  }

  param(key, value) {
    this.urlParams[key] = value;
    return this;
  }

  params(data) {
    Object.keys(data).forEach((key) => this.param(key, data[key]));
    return this;
  }

  body(data) {
    this.body = data;
    return this;
  }

  then(onFulfill, onReject) {
    let url = this.url;
    if (Object.getOwnPropertyNames(this.urlParams).length !== 0)
      url = url + "?" + new URLSearchParams(this.urlParams).toString();

    return fetch(url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    }).then(onFulfill, onReject);
  }
}

export default GithubAPI;
