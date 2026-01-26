import axios from "axios";


export const bookBaseURL=axios.create({
     baseURL: import.meta.env.VITE_API_URL, })
bookBaseURL.post("/user/login", { email, password })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
