import http from '../../http-common';

class SedeService {

    getAll(){
        return http.get("/sedes");
    }

    create(data){
        return  http.post("/sedes", data);
    }

    // Search sedes ID

    getID(id){
        return http.get(`/sedes/${id}`)
    }

    update(id, data){
        return http.put(`/sedes/${id}`, data)
    }

    // delete sedes

    delete(id){
        return http.delete(`/sedes/${id}`)
    }
}

export default new SedeService();