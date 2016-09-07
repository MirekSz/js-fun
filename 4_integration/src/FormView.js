import $ from 'jquery';
import template from './formView.hbs';

export const FORM_EVENTS = {
    USER_EDITED: 'user-edited',
    USER_ADDED: 'userAdded',
    FORM_CANCELED: 'formCanceled'
};

class FormView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {UserService} service
     */
    constructor(ee, service) {
        this.ee = ee;
        this.service = service;
    }

    /**
     *
     * @param {string} divID
     * @param {string} mode
     * @param {User} user
     */
    render(divID, mode, user) {
        this.divID = divID;
        this.mode = mode;
        let {ee} = this;
        $(divID).html(FormView.prepareFormHtml(mode));

        let $form = $('#form');
        this.deserializeForm($form, user);

        $('#cancelBtn').click(() => {
            this.hideFormView();
            ee.emit(FORM_EVENTS.FORM_CANCELED);
        });
        $form.on('submit', (e) => {
            this.onSubmit($form, user, e);
        });
    }

    /**
     *
     * @param $form
     * @param {User} user
     * @param event
     */
    onSubmit($form, user, event) {
        event.preventDefault();
        let {ee, service, mode} = this;
        let newUserData = this.serializeForm($form, user);
        this.hideFormView();

        if (mode === 'Edytuj') {
            service.editUser(newUserData);
            ee.emit(FORM_EVENTS.USER_EDITED);
        } else if (mode === 'Dodaj') {
            service.addUser(newUserData);
            ee.emit(FORM_EVENTS.USER_ADDED);
        }
    }

    hideFormView() {
        this.mode = 'Hidden';
        $(this.divID).html('');
    }

    /**
     *
     * @param $form
     * @param {User} user
     * @returns {User}
     */
    serializeForm($form, user) {
        let inputs = $form.find('input');
        $.each(inputs, (index, element) => {
            user[element.name] = element.value;
        });
        let selects = $form.find('select');
        $.each(selects, (index, element) => {
            user[element.name] = element.value;
        });
        return user;
    }

    /**
     *
     * @param $form
     * @param {User} user
     */
    deserializeForm($form, user) {
        let inputs = $form.find('input');
        $.each(inputs, (index, element) => {
            element.value = user[element.name];
        });
        let selects = $form.find('select');
        $.each(selects, (index, element) => {
            element.value = user[element.name];
        });
    }

    /**
     *
     * @param {string} mode Dodaj lub Edytuj
     * @returns {string}
     */
    static prepareFormHtml(mode) {
        return template({mode: mode});
    }
}
export default FormView;
