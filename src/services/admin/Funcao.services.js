import http from '../../http-common';

class FuncaoService {

    getAll(){
        return http.get("/funcoes");
    }

    create(data){
        return  http.post("/funcoes", data);
    }

    // Search funcoes ID

    getID(id){
        return http.get(`/funcoes/${id}`)
    }

    update(id, data){
        return http.put(`/funcoes/${id}`, data)
    }

    // delete funcoes

    delete(id){
        return http.delete(`/funcoes/${id}`)
    }
}

export default new FuncaoService();