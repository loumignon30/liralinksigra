import http from '../../http-common';

class UserService {

    getAll(sedeID, emailPesquisa, email, tipoPesquisa, pais, cidade){
        return http.get(`/users?sedeID=${sedeID}&emailPesquisa=${emailPesquisa}&email=${email}&tipoPesquisa=${tipoPesquisa}&pais=${pais}&cidade=${cidade}`);
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