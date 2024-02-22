import axios from "axios";

const jsonApi = axios.create({
  baseURL: "http://localhost:5000/",
});

jsonApi.interceptors.request.use(
  (config) => {
    console.log("json-server 요청 성공");
    return config;
  },
  (error) => {
    console.log("json-server 요청 실패");
    return Promise.reject(error);
  }
);

jsonApi.interceptors.response.use(
  (response) => {
    console.log("json-server로부터 응답 받음");
    return response;
  },
  (error) => {
    console.log("json-server로부터 응답 못 받음");
    return Promise.reject(error);
  }
);

export default jsonApi;
