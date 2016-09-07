import {TABLE_EVENTS} from './TableView';
import {BUTTON_EVENTS} from './ButtonView';
import {FORM_EVENTS} from './FormView';
import $ from 'jquery';

class EventRouter {
    constructor(ee) {
        this.ee = ee;
    }

    /**
     *
     * @param {DetailsView} details
     */
    setDetailsView(details) {
        this.details = details;
    }

    /**
     *
     * @param {FormView} form
     */
    setFormView(form) {
        this.form = form;
    }

    /**
     *
     * @param {ButtonView} buttonView
     */
    setButtonView(buttonView) {
        this.buttonView = buttonView;
    }

    /**
     *
     * @param {TableView} table
     */
    setTableView(table) {
        this.table = table;
    }

    start() {
        this.ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            this.details.data = user;
            this.details.render('#detailsView', user);
        });
        this.ee.on(BUTTON_EVENTS.ADD_NEW_USER, () => {
            this.form.render('#workspace', 'Dodaj', {});
        });
        this.ee.on(TABLE_EVENTS.EDIT_USER, (user) => {
            this.form.render('#workspace', 'Edytuj', user);
        });
    }
}

export default EventRouter;
