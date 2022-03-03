import http from '../../http-common';

class DenunciasService {

    getAll(abreviationLangue, tipoImpressao, sedeID, agenciaID){
        return http.get(`/denuncias?abreviationLangue=${abreviationLangue}&tipoImpressao=${tipoImpressao}&sedeID=${sedeID}&agenciaID=${agenciaID}`);
    }

    create(data){
        return  http.post("/denuncias", data);
    }
    // Search denuncias ID
    getID(id){
        return http.get(`/denuncias/${id}`)
    }

    update(id, data){
        return http.put(`/denuncias/${id}`, data)
    }
    // delete denuncias

    delete(id){
        return http.delete(`/denuncias/${id}`)
    }
}

export default new DenunciasService();