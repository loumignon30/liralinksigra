import http from '../../http-common';

class RatingMotivoService {

    getAll(sedeID, ratingID){
        return http.get(`/ratingMotivo?sedeID=${sedeID}&ratingID=${ratingID}`);
    }

    create(data){
        return  http.post("/ratingMotivo", data);
    }

    // Search ratingMotivo ID

    getID(id){
        return http.get(`/ratingMotivo/${id}`)
    }

    update(id, data){
        return http.put(`/ratingMotivo/${id}`, data)
    }

    // delete ratingMotivo

    delete(id){
        return http.delete(`/ratingMotivo/${id}`)
    }
}

export default new RatingMotivoService();