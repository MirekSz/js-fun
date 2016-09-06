/*eslint-disable */

let chai = require('chai');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);
let assert = chai.assert;
let expect = chai.expect;
let sinon = require('sinon/pkg/sinon');

import EventEmitter from 'event-emitter';
import ButtonView from '../src/ButtonView';
import {TABLE_EVENTS} from '../src/TableView';


describe('ButtonView tests...', function () {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });

    afterEach(function () {
        this.sinon.restore();
    });

    let ee = new EventEmitter();
    let btnView = new ButtonView(ee);
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
    });
});
