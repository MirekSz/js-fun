import $ from "jquery";

import template from './detailsView.hbs';

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
        ee.on('onRowSelectionChange', (user) => {
            this.render(user);
        });
        ee.on('edit-current-user', () => {
            this.hideDetailsView();
        });
        ee.on('add-new-user', () => {
            this.hideDetailsView();
        });
        ee.on('delete-user', () => {
            this.hideDetailsView();
        });
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
        return template({user:user});
    }
}

export default DetailsView;