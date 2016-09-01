/*eslint-disable */

let chai = require('chai');
let assert = chai.assert;

import EventEmitter from 'event-emitter';
import ButtonView from '../src/ButtonView.js';

describe('ButtonView', function() {

    let ee = new EventEmitter();
    let btnView = new ButtonView(ee);
    it('should set correct divID', function() {
        btnView.setDivID('#buttonView');
        assert.equal(btnView.divID, '#buttonView');
    });
});
