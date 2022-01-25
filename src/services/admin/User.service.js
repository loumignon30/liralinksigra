import http from '../../http-common';

class UserService {

    getAll(sedeID){
        return http.get(`/users?sedeID=${sedeID}`);
    }
    
    create(data){
        return  http.post("/users", data);
    }
    // Search user ID

    getID(id){
        return http.get(`/users/${id}`)
    }
    update(id, data){
        return http.put(`/users/${id}`, data)
    }
    // delete user

    delete(id){
        return http.delete(`/users/${id}`)
    }
}

export default new UserService();