import http from '../../http-common';

class PaisService {

    getAll(){
        return http.get("/pais");
    }

    create(data){
        return  http.post("/pais", data);
    }

    // Search pais ID

    getID(id){
        return http.get(`/pais/${id}`)
    }

    update(id, data){
        return http.put(`/pais/${id}`, data)
    }

    // delete pais

    delete(id){
        return http.delete(`/pais/${id}`)
    }
}

export default new PaisService();