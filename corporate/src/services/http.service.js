import axiosInstance from "../config/axios.config";

class HttpService {
  #headers = {};
  getHeaders(config) {
    if (config.files) {
      this.#headers = {
        ...this.#headers,
        "Content-Type": "multipart/form-data",
      };
    }

    if (config.auth) {
      this.#headers = {
        ...this.#headers,
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      };
    }
  }
  postRequest = async (
    url,
    data,
    config = { "Access-Control-Allow-Origin": "*" }
  ) => {
    try {
      console.log("in post request", data, url);
      this.getHeaders(config);
      let response;
      if (data._id) {
        console.log("in post request update");
        response = await axiosInstance.put(url, data, {
          headers: this.#headers,
        });
      } else {
        try {
          console.log("in try of post request, data", data);
          response = await axiosInstance.post(url, data, {
            headers: this.#headers,
          });
        } catch (exception) {
          throw exception;
        }
      }
      console.log("response data", response);
      return response.data;
    } catch (exception) {
      throw exception.data;
    }
  };

  getRequest = async (url, data, config = {}) => {
    try {
      console.log("config", config);
      this.getHeaders(config);
      console.log("#headers");
      let response = await axiosInstance.get(url, {
        headers: this.#headers,
      });
      console.log("get resqust", response);
      return response.data;
    } catch (exception) {
      throw exception.data;
    }
  };
}

export default HttpService;
