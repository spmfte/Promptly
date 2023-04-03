// client/index.js

import axios from "axios";

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");
  axios.post("/api/login", { username, password }).then((response) => {
    console.log(response.data);
  });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const username = formData.get("username");
  const password = formData.get("password");
  axios.post("/api/signup", { username, password }).then((response) => {
    console.log(response.data);
  });
});

