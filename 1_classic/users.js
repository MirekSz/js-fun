var formHtml = ["<div class=\"row\"><div class=\"col-md-4\">&nbsp;<\/div><div class=\"col-md-4\"><h3>",
    "<\/h3><form name=\"form\" id=\"form\"><div class=\"form-group\"><label for=\"name\">Imie:<\/label>" +
    "<input id=\"name\" name=\"name\" class=\"form-control\" type=\"text\" required><\/div><div class=\"form-group\">" +
    "<label for=\"surname\">Nazwisko:<\/label><input id=\"surname\" name=\"surname\" class=\"form-control\" type=\"text\" required><\/div>" +
    "<div class=\"form-group\"><label for=\"age\">Wiek:<\/label>" +
    "<input id=\"age\" name=\"age\" class=\"form-control\" type=\"number\" min=\"18\" max=\"99\" required>" +
    "<\/div><div class=\"form-group\"><label for=\"sex\">Płeć:<\/label><select class=\"form-control\" name=\"sex\" id=\"sex\">" +
    "<option>Mężczyzna<\/option><option>Kobieta<\/option><\/select><\/div><div class=\"form-group\">" +
    "<button type=\"submit\" class=\"btn btn-primary\">Zapisz<\/button>" +
    "<button type=\"button\" id=\"cancelBtn\" class=\"btn btn-warning\">Cofnij<\/button><\/div><\/form><\/div>" +
    "<div class=\"col-md-4\">&nbsp;<\/div><\/div>"];

var users = [{name: 'Jacek', surname: 'Doe', age: '43', sex: 'Mężczyzna'},
    {name: 'Marzanna', surname: 'Uss', age: '54', sex: 'Kobieta'},
    {name: 'Julia', surname: 'Dolej', age: '22', sex: 'Kobieta'}];
var isAnyRowSelected;
var selectedRow;

$(document).ready(initialize);


function initialize() {
    var ee = new EventEmitter();
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
    var user = users[rowNumber];
    $("#extendedView").html(showExtendedViewPure(user));
}


function showExtendedViewPure(user) {
    var extViewHtml =
        ['<div class="container"><div class="row"><div class="col-md-2 evLabel">Imie:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Nazwisko:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Wiek:</div><div class="col-md-2 evValue">',
            '</div></div><div class="row"><div class="col-md-2 evLabel">Płeć:</div><div class="col-md-2 evValue">',
            '</div></div></div>'];

    return extViewHtml[0] + user.name
        + extViewHtml[1] + user.surname + extViewHtml[2] + user.age + extViewHtml[3] + user.sex + extViewHtml[4];
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
    var $form = $("#form");
    if (mode == "Edytuj") {
        deserializeForm($form, users[selectedRow]);
        form.on("submit", function (e) {
            e.preventDefault();
            onEditFormSubmit(users[selectedRow])
        });
    } else {
        form.on("submit", onAddFormSubmit);
    }
    $("#cancelBtn").click(function () {
        createTableView(users);
    });
}


function onEditFormSubmit(user) {
    users[selectedRow] = serializeForm($, user);
    createTableView(users);
}

function onAddFormSubmit(e) {
    e.preventDefault();
    users.push(serializeForm($("#form")), {});
    createTableView(users);
}

function serializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index,element) {
        var name = element.name;
        user[name] = element.value;
    });
    return user;
}

function deserializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index, element) {
        // debugger;
        var name = element.name;
        element.value = user[name];
    });
}

function deleteUser() {
    users.splice(selectedRow, 1);
    selectedRow = -1;
    isAnyRowSelected = false;
    createTableView(users);
}