import http from '../../http-common';

class FuncionarioService {

    getAll() {
        return http.get("/funcionarios");
    }
    
    create(data) {
        return http.post("/funcionarios", data);
    }

    // Search agencias ID

    getID(id) {
        return http.get(`/funcionarios/${id}`)
    }

    update(id, data) {
        return http.put(`/funcionarios/${id}`, data)
    }

    // delete agencias

    delete(id) {
        return http.delete(`/funcionarios/${id}`)
    }
}

export default new FuncionarioService();