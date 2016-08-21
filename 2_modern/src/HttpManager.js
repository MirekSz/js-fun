import axios from 'axios';
import User from './user.js';

export const USER_SERVICE_EVENT = {
    USERS_NEW_DATA:'users-new-data'
};

class HttpManager {
    /**
     *
     * @param {EventEmitter} ee
     */
    constructor(ee) {
        this.ee = ee;
        this.axios = axios.create({
            baseURL: 'http://localhost:3000'
        })
    }

    getUsers() {
        this.axios.get('/users')
            .then((response) => {
                this.ee.emit(USER_SERVICE_EVENT, response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param {User} user
     */
    addUser(user) {
        var promise = this.axios.post('/users', {
            user: user
        });

        var promise2 = promise.then(() => {
            this.getUsers();
        });

        return promise2;
    }

    /**
     *
     * @param {User} user
     */
    editUser(user) {
        this.axios.put(`/users`, {
            user: user
        }).then(() => {
            this.getUsers();
        })
    }

    /**
     *
     * @param {number} id
     */
    deleteUser(id) {
        this.axios.delete(`/users/${id}`).then(() => {
            this.getUsers();
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default HttpManager;
