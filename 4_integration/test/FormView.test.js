/* eslint-disable */

import EventEmitter from 'event-emitter';
import FormView from '../src/FormView';
import EventRouter from '../src/EventRouter';
import UserService from '../src/UserService';
import {BUTTON_EVENTS} from '../src/ButtonView';
import {TABLE_EVENTS} from '../src/TableView';
import {FORM_EVENTS} from "../src/FormView";

describe('FormView Tests...', function () {
    let ee = new EventEmitter();
    let service = new UserService(ee);
    let formView = new FormView(ee, service);
    let router = new EventRouter(ee);
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
        expect(serializedUser).eql(user);
    });

    it('should render on ADD_NEW_USER', () => {
        //given
        router.setFormView(formView);
        let spy = sinon.spy(formView, 'render');
        router.start();

        //when
        ee.emit(BUTTON_EVENTS.ADD_NEW_USER);

        //then
        expect(spy).to.have.been.calledWith('#workspace', 'Dodaj', {});

        spy.restore();
    });

    it('should render on EDIT_USER and deserialize', () => {
        //given
        router.setFormView(formView);
        let spy = sinon.spy(formView, 'render');
        router.start();

        //when
        ee.emit(TABLE_EVENTS.EDIT_USER, user);
        let $form = $('#form');
        let serializedUser = formView.serializeForm($form, {id: 0});

        //then
        expect(spy).to.have.been.calledWith('#workspace', 'Edytuj', user);
        expect(serializedUser).eql(user);

        spy.restore();
    });
    it('should editUser and emit USER_EDITED on submit', () => {
        //given
        router.setFormView(formView);
        router.start();
        let stub = sinon.stub(formView.service, 'editUser', (user) => {
            return Promise.resolve(user);
        });

        let eventEmitted = false;
        ee.on(FORM_EVENTS.USER_EDITED, () => {
            eventEmitted = true;
        });

        //when
        ee.emit(TABLE_EVENTS.EDIT_USER, user);
        let $form = $('#form');
        formView.onSubmit($form, {id: 0});

        //then
        expect(eventEmitted).to.be.true;
        expect(stub).to.have.been.calledWith(user);

        stub.restore();
    });
    it('should addUser and emit USER_ADDED on submit', () => {
        //given
        router.setFormView(formView);
        router.start();
        let stub = sinon.stub(formView.service, 'addUser', () => {
            return Promise.resolve();
        });

        let eventEmitted = false;
        ee.on(FORM_EVENTS.USER_ADDED, () => {
            eventEmitted = true;
        });

        //when
        ee.emit(BUTTON_EVENTS.ADD_NEW_USER);
        let $form = $('#form');
        formView.onSubmit($form, user);

        //then
        expect(eventEmitted).to.be.true;
        expect(stub).to.have.been.calledWith(user);

        stub.restore();
    });
});