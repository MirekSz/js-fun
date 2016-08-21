import axios from 'axios';
import User from './user.js';

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
                this.ee.emit('users-new-data', response.data);
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
        this.axios.post('/users', {
            user: user
        }).then(() => {
            this.getUsers();
        });
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
