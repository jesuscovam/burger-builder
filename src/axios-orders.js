import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-b3638.firebaseio.com/"
});

export default instance;
