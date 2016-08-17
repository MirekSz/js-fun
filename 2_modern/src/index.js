import people from './people.js';
import $ from 'jquery';
$(document).ready(initialize);

function initialize() {
    var [ person, person2 ] = people;
    console.log(person);
    document.getElementById('workspace').innerHTML = `${person} and ${person2}`;
}
