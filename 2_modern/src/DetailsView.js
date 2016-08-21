import $ from "jquery";
import template from './detailsView.hbs';

import {TABLE_EVENTS} from './TableView';
import {BUTTON_EVENTS} from './ButtonView';

class DetailsView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {string} divID
     */
    constructor(ee, divID) {
        this.ee = ee;
        this.divID = divID;
        this.setUpListeners();
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            this.render(user);
        });
        ee.on(TABLE_EVENTS.EDIT_USER, this.hideDetailsView().bind(this));
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hideDetailsView().bind(this));
        ee.on(BUTTON_EVENTS.DELETE_USER, this.hideDetailsView().bind(this));
    }

    /**
     *
     * @param {User} user
     */
    render(user) {
        $(this.divID).html(DetailsView.prepareDetailsHtml(user));
    }

    hideDetailsView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param {User} user
     * @returns {string}
     */
    static prepareDetailsHtml(user) {
        console.log(template);
        return template({user});
    }
}

export default DetailsView;