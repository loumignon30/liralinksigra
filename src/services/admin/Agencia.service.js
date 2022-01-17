import http from '../../http-common';

class AgenciaService {

    getAll(){
        return http.get("/agencias");
    }

    create(data){
        return  http.post("/agencias", data);
    }

    // Search agencias ID

    getID(id){
        return http.get(`/agencias/${id}`)
    }

    update(id, data){
        return http.put(`/agencias/${id}`, data)
    }

    // delete agencias

    delete(id){
        return http.delete(`/agencias/${id}`)
    }
}

export default new AgenciaService();