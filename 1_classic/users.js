var formHtml = ["<div class=\"row\"><div class=\"col-md-4\">&nbsp;<\/div><div class=\"col-md-4\"><h3>",
    "<\/h3><form name=\"form\" id=\"form\"><div class=\"form-group\"><label for=\"name\">Imie:<\/label>" +
    "<input id=\"name\" class=\"form-control\" type=\"text\"><\/div><div class=\"form-group\">" +
    "<label for=\"surname\">Nazwisko:<\/label><input id=\"surname\" class=\"form-control\" type=\"text\"><\/div>" +
    "<div class=\"form-group\"><label for=\"age\">Wiek:<\/label><input id=\"age\" class=\"form-control\" type=\"text\"><\/div>" +
    "<div class=\"form-group\"><label for=\"sex\">Płeć:<\/label><select class=\"form-control\" id=\"sex\">" +
    "<option>Mężczyzna<\/option><option>Kobieta<\/option><\/select><\/div><div class=\"form-group\">" +
    "<input type=\"submit\" class=\"btn btn-primary\" value=\"Zapisz\">" +
    "<button type=\"button\" id=\"cancelBtn\" class=\"btn btn-warning\">Cofnij<\/button><\/div><\/form><\/div>" +
    "<div class=\"col-md-4\">&nbsp;<\/div><\/div>"];

var users = [{name:'Jacek', surname:'Doe', age:'43', sex:'Mężczyzna'},
    {name:'Marzanna', surname:'Uss', age:'54', sex:'Kobieta'}, {name:'Julia', surname:'Dolej', age:'22', sex:'Kobieta'}];
var isAnyRowSelected;
var selectedRow;

$(document).ready(initialize);

function initialize() {
    getData();
}

function getData() {
    setTimeout(createTableView(users), 300);
}

function createTableView(users) {
    clearWorkspace();
    isAnyRowSelected = false;
    selectedRow = -1;

    var buttonHtml = "<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button> " +
        "<button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button> " +
        "<button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>";

    $("#workspace").html(buttonHtml + prepareTableHtml(users) + '<div id="extendedView"></div>');
    setOnClickForTableViewButtons();
}

function prepareTableHtml(users) {
    var tHeadHtml = '<thead><tr><th class="col-md-3">Imię</th><th class="col-md-5">Nazwisko</th>' +
        '<th class="col-md-2">Wiek</th><th class="col-md-2">Płeć</th></tr></thead>';

    function createRow(user, rowNumber) {
        return '<tr onclick="onRowClick(' + rowNumber +
            ')" id="tableRow' + rowNumber + '"><td>' + user.name + '</td><td>' + user.surname + '</td><td>' +
            user.age + '</td><td>' + user.sex + '</td></tr>';
    }

    var rowsHtml = '';
    var i;
    for (i = 0; i < users.length; i++) {
        rowsHtml += createRow(users[i], i);
    }
    return '<table class="table table-bordered">' + tHeadHtml
        + '<tbody>' + rowsHtml + '</tbody></table>';
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
    var extViewHtml =
        ['<div class="container"><div class="row"><div class="col-md-2 evLabel">Imie:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Nazwisko:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Wiek:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Płeć:</div><div class="col-md-2 evValue">',
            '</div></div></div>'];

    var user = users[rowNumber];
    $("#extendedView").html(extViewHtml[0] + user.name
        + extViewHtml[1] + user.surname + extViewHtml[2] + user.age + extViewHtml[3] + user.sex + extViewHtml[4]);
}

function setOnClickForTableViewButtons() {
    $("#addBtn").click(function () {
        clearWorkspace();
        createFormView("Dodaj");
    });
    $("#editBtn").click(function () {
        clearWorkspace();
        createFormView("Edytuj");
    });
    $("#deleteBtn").click(function () {
        var answer = confirm("Czy chcesz usunąć tego użytkownika?");
        if (answer) {
            deleteUser();
        }
    });
}

function clearWorkspace() {
    $("#workspace").html("");
}

function createFormView(mode) {
    $("#workspace").html(formHtml[0] + mode + " Użytkownika" + formHtml[1]);
    if (mode == "Edytuj") {
        var user = users[selectedRow];
        $("#name").val(user.name);
        $("#surname").val(user.surname);
        $("#age").val(user.age);
        $("#sex").val(user.sex);
        $("#form").on("submit", onEditFormSubmit);
    } else {
        $("#form").on("submit", onAddFormSubmit);
    }
    $("#cancelBtn").click(function () {
        createTableView(users);
    });
}

function onEditFormSubmit() {
    var i = selectedRow;
    users[i].name = $("#name").val();
    users[i].surname = $("#surname").val();
    users[i].age = $("#age").val();
    users[i].sex = $("#sex").val();
    createTableView(users);
    return false;
}

function onAddFormSubmit() {
    var user = {};
    user.name = $("#name").val();
    user.surname = $("#surname").val();
    user.age = $("#age").val();
    user.sex = $("#sex").val();
    users.push(user);
    createTableView(users);
    return false;
}

function deleteUser() {
    users.splice(selectedRow, 1);
    selectedRow = -1;
    isAnyRowSelected = false;
    createTableView(users);
}