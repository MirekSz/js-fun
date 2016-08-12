var users = [["Jacek", "Doe", "43", "Mężczyzna"],
    ["Marzanna", "Uss", "54", "Kobieta"], ["Julia", "Dolej", "22", "Kobieta"]];

var selectedRow = -1;
var isAnyRowSelected = false;

function createTable(users) {

    var buttonHtml = "<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button> " +
        "<button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button> " +
        "<button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>";


    var tHeadHtml = '<thead><tr><th class="col-md-3">Imię</th><th class="col-md-5">Nazwisko</th>' +
        '<th class="col-md-2">Wiek</th><th class="col-md-2">Płeć</th></tr></thead>';

    var rowsHtml = '';
    for (var i = 0; i < users.length; i++) {
        rowsHtml += createRow(users[i], i);
    }
    var tableHtml = '<table class="table table-bordered">' + tHeadHtml
        + '<tbody>' + rowsHtml + '</tbody></table>';
    $("#workspace").html(buttonHtml + tableHtml + '<div id="extendedView"></div>');
}

function createRow(user, rowNumber) {
    return '<tr onclick="onRowClick(' + rowNumber +
        ')" id="tableRow' + rowNumber + '"><td>' + user[0] + '</td><td>' + user[1] + '</td><td>' +
        user[2] + '</td><td>' + user[3] + '</td></tr>';
}

function onRowClick(rowNumber) {

    if (rowNumber == selectedRow) return;
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
        if (isAnyRowSelected) {
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

function deleteUser() {
    users.splice(selectedRow, 1);
    selectedRow = -1;
    isAnyRowSelected = false;
    createTable(users);
}

function initialize() {
    getData();
    $("#deleteBtn").click(function () {
        var answer = confirm("Czy chcesz usunąć tego użytkownika?");
        if (answer) {
            deleteUser(); //imitacja
        }
    });
}

function getData() {
    setTimeout(createTable(users), 300);
}

$(document).ready(initialize);


var formHtml = ["<div class=\"row\"><div class=\"col-md-4\">&nbsp;<\/div><div class=\"col-md-4\">" +
"<h3>Dodaj użytkownika<\/h3><form name=\"form\" id=\"form\" onsubmit=\"on",
    "FormSubmit()\"><div class=\"form-group\"><label for=\"name\">Imie:<\/label>" +
    "<input id=\"name\" class=\"form-control\" type=\"text\"><\/div><div class=\"form-group\">" +
    "<label for=\"surname\">Nazwisko:<\/label><input id=\"surname\" class=\"form-control\" type=\"text\"><\/div>" +
    "<div class=\"form-group\"><label for=\"age\">Wiek:<\/label><input id=\"age\" class=\"form-control\" type=\"text\"><\/div>" +
    "<div class=\"form-group\"><label for=\"sex\">Płeć:<\/label><select class=\"form-control\" id=\"sex\">" +
    "<option>Mężczyzna<\/option><option>Kobieta<\/option><\/select><\/div><div class=\"form-group\">" +
    "<input type=\"submit\" class=\"btn btn-primary\" value=\"Dodaj\">" +
    "<button type=\"button\" id=\"cancelBtn\" class=\"btn btn-warning\">Cofnij<\/button><\/div><\/form><\/div>" +
    "<div class=\"col-md-4\">&nbsp;<\/div><\/div>"];