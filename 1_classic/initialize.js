//initialization
$(document).ready(initialize);

function initialize() {
    var ee = new EventEmitter();
    new TableView(ee);
    new DetailsView(ee);
    new ButtonView(ee).renderTo("#buttonView", ee);
    new FormView(ee);
    getData(ee);
}

function getData(ee) {
    var users = [{name: 'Jacek', surname: 'Doe', age: '43', sex: 'Mężczyzna'},
        {name: 'Marzanna', surname: 'Uss', age: '54', sex: 'Kobieta'},
        {name: 'Julia', surname: 'Dolej', age: '22', sex: 'Kobieta'}];
    setTimeout(function () {
        ee.emitEvent('users-new-data', [users]);
    }, 30);
}