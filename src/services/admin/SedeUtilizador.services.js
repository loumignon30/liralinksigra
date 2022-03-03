import http from '../../http-common';

class UtilizadorService {

    getAll(sedeID, userID){
        return http.get(`/sedeUtilizador?sedeID=${sedeID}&userID=${userID}`);
    }

    create(data){
        return  http.post("/sedeUtilizador", data);
    }

    // Search sedes ID

    getID(tipoPesquisa, sedeID, userID){
        return http.get(`/sedeUtilizador?tipoPesquisa=${tipoPesquisa}&sedeID=${sedeID}&userID=${userID}`)
    }

    update(id, data){
        return http.put(`/sedeUtilizador/${id}`, data)
    }

    // delete sedes

    delete(id){
        return http.delete(`/sedeUtilizador/${id}`)
    }
}

export default new UtilizadorService();