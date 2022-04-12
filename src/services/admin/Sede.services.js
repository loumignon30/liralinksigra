import http from '../../http-common';

class SedeService {

    getAll(tipoPesquisa, dadosPesquisa){
        return http.get(`/sedes?tipoPesquisa=${tipoPesquisa}&dadosPesquisa=${dadosPesquisa}`);
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