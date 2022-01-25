import http from '../../http-common';

class DepartamentoServices {

        getAll(sedeID, agenciaID){
        return http.get(`/departamentos?sedeID=${sedeID}&agenciaID=${agenciaID}`);
    }

    create(data){
        return  http.post("/departamentos", data);
    }

    // Search departamentos ID

    getID(id){
        return http.get(`/departamentos/${id}`)
    }

    update(id, data){
        return http.put(`/departamentos/${id}`, data)
    }

    // delete departamentos

    delete(id){
        return http.delete(`/departamentos/${id}`)
    }
}

export default new DepartamentoServices();