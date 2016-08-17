import User from './user.js';
import $ from 'jquery';
$(document).ready(initialize);

function initialize() {
    let marek = new User('Marek', 'Jasiński', 54, "M");
    console.log(marek.name);
    document.getElementById('workspace').innerHTML = marek.name;
}
