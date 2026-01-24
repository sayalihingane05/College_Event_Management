import axios from "axios";


export const bookBaseURL=axios.create({
    baseURL:"http://localhost:5000/event"
})