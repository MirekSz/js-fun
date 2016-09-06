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
            this.form.render('#workspace', 'Dodaj');
            let $form = $('#form');
            $form.on('submit', (e) => {
                e.preventDefault();
                let user = this.form.serializeForm($form, {});
                this.form.hideFormView();
                this.form.service.addUser(user);
                this.ee.emit(FORM_EVENTS.USER_ADDED);
            });
        });
        this.ee.on(TABLE_EVENTS.EDIT_USER, (user) => {
            this.form.render('#workspace', 'Edytuj');
            let $form = $('#form');
            this.form.deserializeForm($form, user);

            $form.on('submit', (e) => {
                e.preventDefault();
                let newUserData = this.form.serializeForm($form, user);
                this.form.hideFormView();
                this.form.service.editUser(newUserData);
                this.ee.emit(FORM_EVENTS.USER_EDITED);
            });
        });
    }
}

export default EventRouter;
