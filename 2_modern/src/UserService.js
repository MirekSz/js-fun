import HttpManager from "./HttpManager";

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
        this.http.getData(this.url).then((response) => {
            console.log(response.data);
            this.ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     *
     * @param {User} user
     */
    addUser(user) {
        this.http.post(this.url, user).then(this.getUsers.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param {User} user
     */
    editUser(user) {
        this.http.put(this.url, user).then(this.getUsers.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }
    /**
     *
     * @param id
     */
    deleteUser(id) {
        this.http.doDelete(this.url + id, id).then(this.getUsers.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }
}

export default UserService;