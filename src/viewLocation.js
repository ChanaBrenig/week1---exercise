import { Patient, Location } from "./classes.js";

let userLocation = [];
let table = document.getElementById('table');
let flag = false;

let viewLocation = () => {
    const id = document.getElementById('idInput').value;

    let user = userLocation.filter((user) => id === user._id);

    if (user.length == 0) {
        userLocation.push(new Patient(id));
        user = userLocation.filter((user) => id === user._id);
    }

    if (!flag) {
        drawFirstRowTable();
        newLocation();
        flag = true;
    }

    drawTable(user[0]._locations);
}

let drawTable = (location) => {
    cleanTable();
    location.forEach(element => {
        domTable(element)
    });
}

let drawFirstRowTable = () => {
    const tr = document.createElement('tr');
    tr.id = "firstRowTable";
    const td1 = document.createElement('td');
    td1.innerHTML = "Start date";
    const td2 = document.createElement('td');
    td2.innerHTML = "End date";
    const td3 = document.createElement('td');
    td3.innerHTML = "City";
    const td4 = document.createElement('td');
    td4.innerHTML = "Location";
    const td5 = document.createElement('td');
    td5.innerHTML = "Delete";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);

}

let cleanTable = () => {
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }
}

let domTable = (location) => {

    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.innerHTML = location._startDate.replace("T", " ").replace("Z", "");
    let td2 = document.createElement('td');
    td2.innerHTML = location._endDate.replace("T", " ").replace("Z", "");
    let td3 = document.createElement('td');
    td3.innerHTML = location._city;
    let td4 = document.createElement('td');
    td4.innerHTML = location._location;
    let td5 = document.createElement('td');
    let btn = document.createElement('button');
    btn.id="btnDelete";
    btn.innerHTML = 'X';
    btn.onclick = () => {
        table.removeChild(tr);
        deleteLocation(location)
    };

    td5.appendChild(btn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);

}

let newLocation = () => {
    let div = document.getElementById('newLocation');

    let inputStartdate = document.createElement('input');
    inputStartdate.id = "startDate";
    inputStartdate.type = "datetime-local";
    let inputEndDate = document.createElement('input');
    inputEndDate.id = "endDate";
    inputEndDate.type = "datetime-local";
    let inputCity = document.createElement('input');
    inputCity.id = "city";
    inputCity.placeholder = "City";
    let inputLocation = document.createElement('input');
    inputLocation.id = "location";
    inputLocation.placeholder = "Location";

    let btn = document.createElement('button');
    btn.innerHTML = "Add Location";
    btn.id = "btnAddLocation";
    btn.addEventListener('click', addLocation);

    div.appendChild(inputStartdate);
    div.appendChild(inputEndDate);
    div.appendChild(inputCity);
    div.appendChild(inputLocation);
    div.appendChild(btn);
}

let addLocation = () => {
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let city = document.getElementById('city').value;
    let location = document.getElementById('location').value;
    let newLocation = new Location(startDate, endDate, city, location);
    pushLocation(newLocation);
    domTable(newLocation);

}

let pushLocation = (newLocation) => {
    const id = document.getElementById('idInput').value;
    userLocation.find((user) => id === user._id)._locations.push(newLocation);
}

let deleteLocation = (location) => {
    const id = document.getElementById('idInput').value;

    let arr = userLocation.find((user) => id === user._id)._locations.filter((item) => location !== item);
    userLocation.find((user) => id === user._id)._locations = arr;

}

let patientReports = () => {
    sessionStorage.setItem("userLocation", JSON.stringify(userLocation));
    window.location.href = "./patientReports.html"
}

document.getElementById('viewLocation').addEventListener(
    'click', viewLocation
);

document.getElementById('patientReports').addEventListener(
    'click', patientReports
);


