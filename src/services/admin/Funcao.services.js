import http from '../../http-common';

class FuncaoService {

    getAll(sedeID, agenciaID, funcaoPesquisa){
        return http.get(`/funcoes?sedeID=${sedeID}&agenciaID=${agenciaID}&funcaoPesquisa=${funcaoPesquisa}`);
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