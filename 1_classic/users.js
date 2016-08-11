function createTable(users) {

    var tHeadHtml = '<thead><tr><th>Imię</th><th>Nazwisko</th><th>Wiek</th><th>Płeć</th></tr></thead>';

    var rowsHtml = '';
    for(i = 0; i < users.length; i++) {
        rowsHtml += createRow(i);
    }
    var tableHtml = '<table class="table table-bordered table-hover">' + tHeadHtml
        + '<tbody>' + rowsHtml + '</tbody></table>';
    $("#workspace").html(tableHtml + '<div id="extendedView"></div>');
}

function createRow(i) {
    var user = users[i];
    return '<tr onclick="showExtendedView(' + i +
        ')"><td>' + user[0] + '</td><td>' + user[1] + '</td><td>' + user[2] + '</td><td>' + user[3] + '</td></tr>';
}

function showExtendedView(rowNumber) {
    var user = users[rowNumber];
    $("#extendedView").html(extViewHtml[0] + user[0]
        + extViewHtml[1] + user[1] + extViewHtml[2] + user[2] + extViewHtml[3] + user[3] + extViewHtml[4]);
}

var extViewHtml =
    ['<div class="container"><div class="row"><div class="col-md-2 evLabel">Imie:</div><div class="col-md-2 evValue">',
        '</div></div><div class="row"><div class="col-md-2 evLabel">Nazwisko:</div><div class="col-md-2 evValue">',
        '</div></div><div class="row"><div class="col-md-2 evLabel">Wiek:</div><div class="col-md-2 evValue">',
        '</div></div><div class="row"><div class="col-md-2 evLabel">Płeć:</div><div class="col-md-2 evValue">',
        '</div></div></div>'];

function getData() {
    var users = [["Jacek", "Doe", "43", "Mężczyzna"],["Marzanna", "Uss", "54", "Kobieta"],["Julia", "Dolej", "22", "Kobieta"]];
    setTimeout(createTable(users), 300);
}
$(document).ready(getData);
