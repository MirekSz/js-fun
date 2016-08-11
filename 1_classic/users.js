var users = [["Jacek", "Doe", "43", "Mężczyzna"],["Marzanna", "Uss", "54", "Kobieta"],["Julia", "Dolej", "22", "Kobieta"]];

var selectedRow = -1;
var isAnyRowSelected = false;

function createTable(users) {

    var tHeadHtml = '<thead><tr><th>Imię</th><th>Nazwisko</th><th>Wiek</th><th>Płeć</th></tr></thead>';

    var rowsHtml = '';
    for(var i = 0; i < users.length; i++) {
        rowsHtml += createRow(users[i], i);
    }
    var tableHtml = '<table class="table table-bordered">' + tHeadHtml
        + '<tbody>' + rowsHtml + '</tbody></table>';
    $("#workspace").html(tableHtml + '<div id="extendedView"></div>');
}

function createRow(user, rowNumber) {
    return '<tr onclick="onRowClick(' + rowNumber +
        ')" id="tableRow' + rowNumber + '"><td>' + user[0] + '</td><td>' + user[1] + '</td><td>' + user[2] + '</td><td>' + user[3] + '</td></tr>';
}

function onRowClick(rowNumber) {

    if(rowNumber == selectedRow) return;
    else {
        selectRow(rowNumber);
        selectedRow = rowNumber;
        showExtendedView(rowNumber);
    }
    if (!isAnyRowSelected) {
        $("#editBtn").attr("disabled", false);
        $("#deleteBtn").attr("disabled", false);
    }
    isAnyRowSelected = true;

    function selectRow(rowNumber) {
        if(isAnyRowSelected) {
            $("#tableRow" + selectedRow).removeClass("activeRow");
        }
        $("#tableRow" + rowNumber).addClass("activeRow");
    }

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
    setTimeout(createTable(users), 300);
}
$(document).ready(getData);
