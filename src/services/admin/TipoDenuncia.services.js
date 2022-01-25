import http from '../../http-common';

class TipoDenunciaServices {

    getAll(abreviationLangue, sedeID){
        return http.get(`/tipoDenuncia?abreviationLangue=${abreviationLangue}&sedeID=${sedeID}`);
    }

    create(data){
        return  http.post("/tipoDenuncia", data);
    }

    // Search sedes ID

    getID(id){
        return http.get(`/tipoDenuncia/${id}`)
    }

    update(id, data){
        return http.put(`/tipoDenuncia/${id}`, data)
    }

    // delete sedes

    delete(id){
        return http.delete(`/tipoDenuncia/${id}`)
    }
}

export default new TipoDenunciaServices();