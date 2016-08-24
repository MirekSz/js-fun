import axios from "axios";

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
     * @param url
     * @return {axios.Promise}
     */
    getData(url) {
        return this.axios.get(url);
    }

    /**
     *
     * @param {string} url
     * @param {User} postData
     * @return {axios.Promise}
     */
    post(url, postData) {
        return this.axios.post(url, postData);
    }

    /**
     *
     * @param {string} url
     * @param {User} putData
     * @return {axios.Promise}
     */
    put(url, putData) {
        return this.axios.put(url, putData);
    }

    /**
     *
     * @param {string} url
     * @param {Object} id
     * @return {axios.Promise}
     */
    doDelete(url, id) {
        return this.axios.delete(url, id);
    }
}

export default HttpManager;
