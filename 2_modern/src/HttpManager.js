import axios from 'axios';
import User from './user.js';

class HttpManager {

    /**
     *
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        this.axios = axios.create({
            baseURL: baseUrl
        })
    }

    /**
     *
     * @param {string} url
     * @param {function} callback
     */
    getData(url, callback) {
        this.axios.get(url)
            .then((response) => callback(response.data))
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param {string} url
     * @param {Object} postData
     * @param {function} callback
     */
    post(url, postData, callback) {
        this.axios.post(url, postData)
            .then(callback())
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param {string} url
     * @param {Object} putData
     * @param {function} callback
     */
    put(url, putData, callback) {
        this.axios.put(url, putData)
            .then(callback())
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     *
     * @param {string} url
     * @param {Object} id
     * @param {function} callback
     */
    doDelete(url, id, callback) {
        this.axios.delete(url, id)
            .then(callback())
            .catch((error) => {
                console.log(error);
            });
    }
}

export default HttpManager;
