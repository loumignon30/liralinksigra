import axios from "axios";
// export default  axios.create({
//     baseURL: "http://localhost:7001/api",  // era 7001 en desenvolvimento
//     headers:{
//         "Content-type": "application/json"    }
// });


export default  axios.create({
    baseURL: "https://liralink-sigra.herokuapp.com/api",  // era 7001 en desenvolvimento
    headers:{
        "Content-type": "application/json"    }
});
 
