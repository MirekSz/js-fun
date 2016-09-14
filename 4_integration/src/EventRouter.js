import {TABLE_EVENTS} from './TableView';
import {BUTTON_EVENTS} from './ButtonView';
import {USER_SERVICE_EVENT} from './UserService';
import {FORM_EVENTS} from './FormView';

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
        let {ee, table, buttonView, details, form} = this;

        if (typeof buttonView !== 'undefined') {
            buttonView.render('#buttonView');
        }
        if (typeof table !== 'undefined') {
            table.render('#workspace', [], true);
        }

        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (users) => {
            table.render('#workspace', users, false);
        });
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            buttonView.render('#buttonView', false);
            details.render('#detailsView', user);
        });
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, () => {
            buttonView.hide();
            table.hide();
            details.hide();
            form.render('#workspace', 'Dodaj', {});
        });
        ee.on(BUTTON_EVENTS.DELETE_USER, () => {
            details.hide();
        });
        ee.on(TABLE_EVENTS.EDIT_USER, (user) => {
            table.hide();
            details.hide();
            buttonView.hide();
            form.render('#workspace', 'Edytuj', user);
        });
        ee.on(FORM_EVENTS.USER_EDITED, () => {
            form.hide();
            table.render(this.divID, {}, true);
            buttonView.render('#buttonView');
        });
        ee.on(FORM_EVENTS.USER_ADDED, () => {
            form.hide();
            table.render(this.divID, {}, true);
            buttonView.render('#buttonView');
        });
        ee.on(FORM_EVENTS.FORM_CANCELED, () => {
            form.hide();
            buttonView.render('#buttonView');
            table.render('#workspace', table.users, false);
        });
    }
}

export default EventRouter;
