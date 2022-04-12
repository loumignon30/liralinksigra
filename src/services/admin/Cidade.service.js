import http from '../../http-common';

class CidadeService {

    getAll(tipoPesquisa, paisID){
        return http.get(`/cidade?tipoPesquisa=${tipoPesquisa}&paisID=${paisID}`);
    }

    create(data){
        return  http.post("/cidade", data);
    }

    // Search cidade ID

    getID(id){
        return http.get(`/cidade/${id}`)
    }

    update(id, data){
        return http.put(`/cidade/${id}`, data)
    }

    // delete cidade

    delete(id){
        return http.delete(`/cidade/${id}`)
    }
}

export default new CidadeService();