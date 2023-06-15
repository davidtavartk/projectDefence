import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

const registerUser = (username, password, email) => {
    return api.post('/register', {
        username: username,
        password: password,
        email: email
      })
}

export { api, registerUser};