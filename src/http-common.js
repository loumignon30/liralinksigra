import axios from "axios";
export default  axios.create({
    baseURL: "http://localhost:7001/api",  // era 7001 en desenvolvimento
    headers:{
        "Content-type": "application/json",
        'Accept' : 'application/json',
        //'Authorization': localStorage.getItem('token'),
        Authorization: `Bearer ` + localStorage.getItem('token')
        // Authorization:  localStorage.getItem('token')
     }
});

// export default  axios.create({
//     baseURL: "https://liralink-sigra.herokuapp.com/api",  // era 7001 en desenvolvimento
//     headers:{
//         "Content-type": "application/json"   ,
//          'Accept' : 'application/json',
//         Authorization: `Bearer ` + localStorage.getItem('token')
//      }
// });
 