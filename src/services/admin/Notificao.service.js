import http from '../../http-common';

class NotificaoService {

    getAll(tipoPesquisa, sedeID, funcionarioID, tipoMovimento){
        return http.get(`/Notificao?tipoPesquisa=${tipoPesquisa}&sedeID=${sedeID}&funcionarioID=${funcionarioID}&tipoMovimento=${tipoMovimento}`);
    }

    create(data){
        return  http.post("/Notificao", data);
    }

    // Search cidade ID

    getID(id){
        return http.get(`/Notificao/${id}`)
    }

    update(id, data){
        return http.put(`/Notificao/${id}`, data)
    }

    // delete cidade

    delete(id){
        return http.delete(`/Notificao/${id}`)
    }
}

export default new NotificaoService();