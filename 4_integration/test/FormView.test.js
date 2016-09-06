/* eslint-disable */

import EventEmitter from 'event-emitter';
import FormView from '../src/FormView';
import EventRouter from '../src/EventRouter';
import {BUTTON_EVENTS} from '../src/ButtonView';
import {TABLE_EVENTS} from '../src/TableView';

describe('FormView Tests...', function () {
    let ee = new EventEmitter();
    let formView = new FormView(ee);
    let router = new EventRouter(ee);

    before(()=> {
        $(document.body).append('<div id="workspace"></div>');
    });

    afterEach(()=> {
        $('#workspace').empty();
    });

    it('should deserialize', () => {
        //given
        formView.render('#workspace', 'Dodaj');
        let user = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};
        let $form = $('#form');

        //when
        formView.deserializeForm($form, user);
        let name = $form.find(`input[name='name']`).val();
        let sex = $form.find(`select[name='sex']`).val();

        //then
        expect(name).to.equal('Jacek');
        expect(sex).to.equal('Mężczyzna');
    });

    it('should serialize', () => {
        //given
        formView.render('#workspace', 'Dodaj');
        let user = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};
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
        expect(spy).to.have.been.calledWith('#workspace', 'Dodaj');
        spy.restore();
    });

    it('should render on EDIT_USER and deserialize', () => {
        //given
        router.setFormView(formView);
        let spy = sinon.spy(formView, 'render');
        router.start();
        let user = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};

        //when
        ee.emit(TABLE_EVENTS.EDIT_USER, {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"});
        let $form = $('#form');
        let serializedUser = formView.serializeForm($form, {id:0});

        //then
        expect(spy).to.have.been.calledWith('#workspace', 'Edytuj');
        expect(serializedUser).eql(user);
        spy.restore();
    });
});