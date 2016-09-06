/* eslint-disable */

import EventEmitter from 'event-emitter';
import FormView from '../src/FormView';
import EventRouter from '../src/EventRouter';
import {BUTTON_EVENTS} from '../src/ButtonView';

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

    it('should render on ADD_NEW_USER', () => {
        //given
        router.setFormView(formView);
        let spy = sinon.spy(formView, 'render');
        router.start();

        //when
        ee.emit(BUTTON_EVENTS.ADD_NEW_USER);

        //then
        expect(spy).to.have.been.calledWith('#workspace', 'Dodaj');
    });
    it('should serialize and deserialize', ()=> {
        //given
        formView.render('#workspace', 'Dodaj');
        let user = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};
        let $form = $('#form');

        //when
        formView.deserializeForm($form, user);
        let serializedUser = formView.serializeForm($form, user);

        //then
        expect(serializedUser).to.be.eq(user);
    });


});