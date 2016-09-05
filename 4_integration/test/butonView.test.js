/*eslint-disable */

let chai = require('chai');
let assert = chai.assert;

import EventEmitter from 'event-emitter';
import ButtonView from '../src/ButtonView';
import {TABLE_EVENTS} from '../src/TableView';

describe('ButtonView tests...', function () {

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
        expect(btnView.disabled).to.be.eq(true);
    });
    it('should enable buttons after ON_ROW_SELECTION_CHANGE event', function () {
        ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE);
        expect(btnView.disabled).to.be.eq(false);
    })
});
