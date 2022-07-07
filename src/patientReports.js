let locations = [];
let table = document.getElementById('locationsTable');

let onload = () => {
    let userLocationFromJson = sessionStorage.getItem("userLocation");
    let userLocation = JSON.parse(userLocationFromJson);
    console.log(userLocation);
    filterLocation(userLocation);
    sortLocations(locations);
    drawLocations(locations);
}

let filterLocation = (userLocation) => {
    userLocation.forEach(element => {
        element._locations.forEach(location => {
            locations.push(location);
        });;
    });
}


let sortLocations = (locations) => {
    locations.sort(function (a, b) {
        return ((new Date(b._startDate).getTime() - new Date(a._startDate).getTime()))
    });
}

let drawLocations = (location) => {
    cleanTable();
    location.forEach(element => {
        domTable(element)
    });
}

let cleanTable = () => {
    while (table.childElementCount > 0) {
        table.removeChild(table.lastChild);
    }
}

let formatDate = (startDate, endDate) => {
    return (startDate.getFullYear() + '.' +
        startDate.getMonth() + '.' +
        startDate.getDate() + '  ' + startDate.getHours() + ':' + startDate.getMinutes() + ' - ' +
        endDate.getHours() + ':' + endDate.getMinutes());
}


let domTable = (location) => {

    const tr = document.createElement('tr');
    const td0 = document.createElement('td');
    td0.innerHTML='-';
    td0.id="firstColumn";
    const td1 = document.createElement('td');
    td1.innerHTML = formatDate(new Date(location._startDate), new Date(location._endDate));

    const td3 = document.createElement('td');
    td3.innerHTML = location._city;
    const td4 = document.createElement('td');
    td4.id="lastColumn";
    td4.innerHTML = location._location;

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr);

}

let filterByCity = () => {
    const city = document.getElementById('cityInput').value;
    if (city == '') {
        drawLocations(locations);
    } else {
        let locationByCity = locations.filter((location) => city === location._city);
        drawLocations(locationByCity);
    }
}

function viewLocations() {
    window.location.href = "./viewLocation.html"
}

document.getElementById('cityInput').addEventListener(
    'change', filterByCity
);

window.onpageshow = onload();

