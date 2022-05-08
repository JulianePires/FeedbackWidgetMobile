import axios from "axios";

export const api = axios.create({
  baseURL: "https://feedbackwidgetbackend.herokuapp.com",
});
