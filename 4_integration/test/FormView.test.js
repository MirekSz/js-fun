/* eslint-disable */

import EventEmitter from 'event-emitter';
import FormView from '../src/FormView';
import UserService from '../src/UserService';
import {FORM_EVENTS} from "../src/FormView";

describe('FormView Tests...', function () {
    let ee = new EventEmitter();

    let formView = new FormView(ee, new UserService(ee));
    let user = {id: 0, name: 'Jacek', surname: 'Doe', age: '43', sex: 'Mężczyzna'};

    before(()=> {
        $(document.body).append('<div id="workspace"></div>');
    });

    afterEach(()=> {
        $('#workspace').empty();
    });

    it('should deserialize', () => {
        //given
        let spy = sinon.spy(formView, 'deserializeForm');

        //when
        formView.render('#workspace', 'Edytuj', user);
        let $form = $('#form');
        let name = $form.find(`input[name='name']`).val();
        let sex = $form.find(`select[name='sex']`).val();

        //then
        expect(spy).have.been.called;
        expect(name).to.equal('Jacek');
        expect(sex).to.equal('Mężczyzna');

        spy.restore();
    });

    it('should serialize', () => {
        //given
        formView.render('#workspace', 'Dodaj', user);
        let $form = $('#form');
        formView.deserializeForm($form, user);

        //when
        let serializedUser = formView.serializeForm($form, {id: 0});

        //then
        expect(serializedUser).to.be.eql(user);
    });

    it('should editUser and emit USER_EDITED on submit', () => {
        //given

        let stub = sinon.stub(formView.service, 'editUser', (user) => {
            return Promise.resolve(user);
        });

        let eventEmitted = false;
        ee.on(FORM_EVENTS.USER_EDITED, () => {
            eventEmitted = true;
        });

        //when
        formView.render('#workspace', 'Edytuj', user);
        let $form = $('#form');
        formView.onSubmit($form, {id: 0});

        //then
        expect(eventEmitted).to.be.true;
        expect(stub).to.have.been.calledWith(user);

        stub.restore();
    });
    it('should addUser and emit USER_ADDED on submit', () => {
        //given
        let stub = sinon.stub(formView.service, 'addUser', () => {
            return Promise.resolve();
        });

        let eventEmitted = false;
        ee.on(FORM_EVENTS.USER_ADDED, () => {
            eventEmitted = true;
        });

        //when
        formView.render('#workspace', 'Dodaj', {});
        let $form = $('#form');
        formView.onSubmit($form, user);

        //then
        expect(eventEmitted).to.be.true;
        expect(stub).to.have.been.calledWith(user);

        stub.restore();
    });
    it('should emit FORM_CANCELED on cancel', () => {
        //given

        let eventEmitted = false;
        ee.on(FORM_EVENTS.FORM_CANCELED, () => {
            eventEmitted = true;
        });

        //when
        formView.render('#workspace', 'Dodaj', {});
        formView.$cancel.click();

        //then
        expect(eventEmitted).to.be.true;
    });

});