import $ from 'jquery';
import template from './detailsView.hbs';

import {TABLE_EVENTS} from './TableView';
import {BUTTON_EVENTS} from './ButtonView';

class DetailsView {
    /**
     *
     * @param {EventEmitter} ee
     * @param divID
     */
    constructor(ee, divID) {
        this.ee = ee;
        this.divID = divID;
        this.data = {};
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            this.data = user;
            this.render(this.divID, user);
        });
        ee.on(TABLE_EVENTS.EDIT_USER, this.hideDetailsView.bind(this));
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hideDetailsView.bind(this));
        ee.on(BUTTON_EVENTS.DELETE_USER, this.hideDetailsView.bind(this));
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

    hideDetailsView() {
        $(this.divID).html('');
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
