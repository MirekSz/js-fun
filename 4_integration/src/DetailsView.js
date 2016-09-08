import $ from 'jquery';
import template from './detailsView.hbs';

import {TABLE_EVENTS} from './TableView';
import {BUTTON_EVENTS} from './ButtonView';

class DetailsView {
    /**
     *
     * @param {EventEmitter} ee
     */
    constructor(ee) {
        this.ee = ee;
        this.data = {};
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(TABLE_EVENTS.EDIT_USER, this.hide.bind(this));
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hide.bind(this));
        ee.on(BUTTON_EVENTS.DELETE_USER, this.hide.bind(this));
    }

    /**
     *
     * @param divID
     * @param user
     */
    render(divID, user) {
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
