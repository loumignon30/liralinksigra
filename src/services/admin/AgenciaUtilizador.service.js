import http from '../../http-common';

class AgenciaUtilizadorService {

    getAll(sedeID, userID){
        return http.get(`/agenciaUtilizador?sedeID=${sedeID}&userID=${userID}`);
    }

    create(data){
        return  http.post("/agenciaUtilizador", data);
    }

    // Search sedes ID

    getID(id){
        return http.get(`/agenciaUtilizador/${id}`)
    }

    update(id, data){
        return http.put(`/agenciaUtilizador/${id}`, data)
    }

    // delete sedes

    delete(id){
        return http.delete(`/agenciaUtilizador/${id}`)
    }
}

export default new AgenciaUtilizadorService();