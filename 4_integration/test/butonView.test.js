/*eslint-disable */

import EventEmitter from 'event-emitter';
import ButtonView, {BUTTON_EVENTS} from '../src/ButtonView';
import {TABLE_EVENTS} from '../src/TableView';

describe('ButtonView tests...', function () {
    let ee = new EventEmitter();
    let btnView = new ButtonView(ee);

    let sandbox;
    beforeEach(function () {
        $(document.body).append('<div id="buttonView"></div>');
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
        $('#buttonView').empty();
    });

    it('should set correct divID', function () {
        //when
        btnView.render('#buttonView');

        //then
        expect(btnView.divID).to.be.eq('#buttonView');
    });
    it('should have disabled property equal to true', function () {
        //when
        btnView.setButtonsDisabled(true);

        //then
        expect(btnView.disabled);
    });
    it('should enable buttons after ON_ROW_SELECTION_CHANGE event', function () {
        //given
        let spy = sinon.spy(btnView, 'setButtonsDisabled');

        //when
        ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE);

        //then
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith(false);
        spy.restore();
    });
    it('should emit event and hide after editBtn.click', function () {

        let spy = sandbox.spy(btnView, 'hide');
        let eventEmitted = false;
        ee.on(BUTTON_EVENTS.EDIT_BUTTON_CLICK, () => {
            eventEmitted = true;
        });
        //when
        btnView.render('#buttonView');
        btnView.$editBtn.click();

        //then
        expect(eventEmitted).to.be.true;
        expect(spy).to.be.called;
    });
    it('should hide after addBtn.click', function () {
        //given
        let spy = sandbox.spy(btnView, 'hide');
        let eventEmitted = false;
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, () => {
            eventEmitted = true;
        });

        //when
        btnView.render('#buttonView');
        btnView.$addBtn.click();

        //then
        expect(eventEmitted).to.be.true;
        expect(spy).to.be.called;
    });
});
