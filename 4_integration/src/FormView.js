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

        this.$cancel = $('#cancelBtn');
        this.$cancel.click(() => {
            this.hide();
            ee.emit(FORM_EVENTS.FORM_CANCELED);
        });
        $form.on('submit', (e) => {
            e.preventDefault();
            this.onSubmit($form, user);
        });
    }

    /**
     *
     * @param $form
     * @param {User} user
     */
    onSubmit($form, user) {
        let {ee, service, mode} = this;
        let newUserData = this.serializeForm($form, user);

        if (mode === 'Edytuj') {
            service.editUser(newUserData);
            ee.emit(FORM_EVENTS.USER_EDITED);
        } else if (mode === 'Dodaj') {
            service.addUser(newUserData);
            ee.emit(FORM_EVENTS.USER_ADDED);
        }
        this.hide();
    }

    hide() {
        this.mode = 'Hidden';
        $(this.divID).empty();
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
