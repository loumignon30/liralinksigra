import axios from "axios";
export default  axios.create({
    baseURL: "https://liralink-sigra.herokuapp.com/api",  // era 7001 en desenvolvimento
    headers:{
        "Content-type": "application/json"    }
});

 
