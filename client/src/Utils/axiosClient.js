import { getitem, KEY_ACCESS, removeitem, setitem } from "./localStorage";
import axios from "axios";
let baseURL = "http://localhost:3002/api/v1";
export const axiosclient = axios.create({
  baseURL: "http://localhost:3002/api/v1",
  withCredentials: true,
});

// Request interceptor
//incorect passowrd me it keep son calling
axiosclient.interceptors.request.use((request) => {
  const accessToken = getitem(KEY_ACCESS);
  // console.log("this is ", accessToken);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

// Response interceptor
//now this will be working fine
axiosclient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    //as no user is present tow kaam kipe krega

    console.log(response);
    if (data.status === "ok") {
      // window.location.replace("/home","_self");
      return response;
    }
    if (data.message == "Incorrect Password/Email") {
      //here i want to put to return incorrct credintial and such that it can be handled and shown in the frontend view
      return Promise.reject(
        new Error("Invalid credentials. Please check your email and password.")
      );
    }
    if (response.statusCode === 404) {
      // removeitem(KEY_ACCESS);
      window.location.replace("/login", "_self");
      return;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.error;
    console.log(data);
    if (statusCode === 401 && !originalRequest._retry) {
      // means the access token has expired
      originalRequest._retry = true;
      // console.log('are you sure you');
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${baseURL}/auth/refresh`);

      if (response.data.status === "ok") {
        console.log(response.data.result);
        setitem(KEY_ACCESS, response.data.result);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result}`;

        return axios(originalRequest);
      } else {
        removeitem(KEY_ACCESS);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  (error) => {
    console.log("Interceptor error:", error);
    // return Promise.reject(error);
  }
);
