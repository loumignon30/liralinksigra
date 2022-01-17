import http from '../../http-common';

class UserLoginService {
    getUserEmail(email, pswd){
        return http.get(`/usersLogin?email=${email}&pswd=${pswd}`);
    }
}

export default new UserLoginService();