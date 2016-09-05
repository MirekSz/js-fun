/*eslint-disable */

let chai = require('chai');
let assert = chai.assert;

import EventEmitter from 'event-emitter';
import ButtonView from '../src/ButtonView.js';

describe('ButtonView tests...', function () {

    let ee = new EventEmitter();
    let btnView = new ButtonView(ee);
    it('should set correct divID', function () {
        //when
        btnView.render('#buttonView');

        //then
        assert.equal(btnView.divID, '#buttonView');
    });
    it('should have disabled property equal to true', function () {
        //when
        btnView.setButtonsDisabled(true);

        //then
        assert.equal(btnView.disabled, true);
    });
});
