import HttpManager from "./HttpManager";

export const USER_SERVICE_EVENT = {
    USERS_NEW_DATA: 'users-new-data'
};

class UserService {
    constructor(ee, baseUrl, usersUrl) {
        this.ee = ee;
        this.http = new HttpManager(baseUrl);
        this.url = usersUrl;
    }

    getUsers() {
        this.http.getData(this.url, (data) => {
            this.ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, data);
        });

    }

    addUser(user) {
        this.http.post(this.url, user, this.getUsers.bind(this));
    }

    editUser(user) {
        this.http.put(this.url, user, this.getUsers.bind(this));
    }

    deleteUser(id) {
        this.http.doDelete(this.url + id, id, this.getUsers.bind(this));
    }
}

export default UserService;