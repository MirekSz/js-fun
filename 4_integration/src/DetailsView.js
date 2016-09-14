import $ from 'jquery';
//noinspection JSUnresolvedVariable
import template from './detailsView.hbs';

class DetailsView {

    constructor() {
        this.data = {};
    }

    /**
     *
     * @param divID
     * @param user
     */
    render(divID, user) {
        this.data = user;
        this.divID = divID;
        $(divID).html(DetailsView.prepareDetailsHtml(user));
    }

    hide() {
        $(this.divID).empty();
    }

    /**
     *
     * @param {User} user
     * @returns {string}
     */
    static prepareDetailsHtml(user) {
        return template({user});
    }
}

export default DetailsView;
