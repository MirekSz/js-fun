/* eslint-disable */

import EventEmitter from 'event-emitter';
import FormView from '../src/FormView';
import EventRouter from '../src/EventRouter';
import {BUTTON_EVENTS} from '../src/ButtonView';

describe('FormView Tests...', function () {
    let ee = new EventEmitter();
    let formView = new FormView();
    let router = new EventRouter(ee);
    it('should render on ADD_NEW_USER', () => {
        //given
        router.setFormView(formView);
        let spy = sinon.spy(formView, 'render');

        //when
        ee.emit(BUTTON_EVENTS.ADD_NEW_USER);

        //then
        expect(spy).to.have.been.calledWith('Dodaj');
    })


});