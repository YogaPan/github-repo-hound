import axios from "axios";

const API_URL = "https://api.github.com/";

class GithubAPI {
  static get = (url) => new GithubAPI("GET", url);
  static post = (url) => new GithubAPI("POST", url);
  static put = (url) => new GithubAPI("PUT", url);
  static delete = (url) => new GithubAPI("DELETE", url);

  static searchRepo = (qualifiers) =>
    GithubAPI.get("/search/repositories").param("q", qualifiers);

  constructor(method, path) {
    this._url = new URL(path, API_URL).toString();
    this._method = method || "GET";
    this._urlParams = {};
    this._headers = {};
    this._bodyData = undefined;
    this._cancelToken = undefined;
  }

  paginate(page, perPage) {
    this.params({ page, per_page: perPage });
    return this;
  }

  headers(data) {
    this._headers = data;
    return this;
  }

  param(key, value) {
    this._urlParams[key] = value;
    return this;
  }

  params(data) {
    Object.keys(data).forEach((key) => this.param(key, data[key]));
    return this;
  }

  body(data) {
    this._bodyData = data;
    return this;
  }

  cancelToken(cancelToken) {
    this._cancelToken = cancelToken;
    return this;
  }

  then(onFulfill, onReject) {
    return axios({
      url: this._url,
      method: this._method,
      params: this._urlParams,
      headers: this._headers,
      data: this._bodyData,
      cancelToken: this._cancelToken,
    })
      .then((res) => {
        if (res.status === 200) return res.data;
        throw new Error(res.status);
      })
      .then(onFulfill, onReject);
  }
}

export default GithubAPI;
