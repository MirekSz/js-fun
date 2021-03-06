import HttpManager from './HttpManager';

export const USER_SERVICE_EVENT = {
    USERS_NEW_DATA: 'users-new-data'
};

class UserService {
    /**
     *
     * @param {EventEmitter} ee
     * @param baseUrl
     * @param usersUrl
     */
    constructor(ee, baseUrl, usersUrl) {
        this.ee = ee;
        this.http = new HttpManager(baseUrl);
        this.url = usersUrl;
    }

    getUsers() {
        return this.http.getData(this.url).then((response) => {
            this.ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }

    /**
     *
     * @param {User} newUser
     */
    addUser(newUser) {
        return this.http.post(this.url, newUser).then((user) => {
            this.getUsers();
            return user;
        });
    }

    /**
     *
     * @param {User} user
     */
    editUser(user) {
        return this.http.put(this.url, user).then(this.getUsers.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param id
     */
    deleteUser(id) {
        return this.http.doDelete(this.url + id, id).then(this.getUsers.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }
}

export default UserService;
