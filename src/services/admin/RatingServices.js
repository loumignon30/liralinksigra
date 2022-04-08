import http from '../../http-common';

class RatingService {

    getAll(sedeID, rating){
        return http.get(`/ratings?sedeID=${sedeID}&rating=${rating}`);
    }

    create(data){
        return  http.post("/ratings", data);
    }

    // Search ratings ID

    getID(id){
        return http.get(`/ratings/${id}`)
    }

    update(id, data){
        return http.put(`/ratings/${id}`, data)
    }

    // delete ratings

    delete(id){
        return http.delete(`/ratings/${id}`)
    }
}

export default new RatingService();