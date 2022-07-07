class Patient {
    constructor(id, locations=[]) {
        this._id = id;
        this._locations = locations;
    }


};


class Location {

    constructor(startDate, endDate, city, location) {
        this._startDate = startDate;
        this._endDate = endDate;
        this._city = city;
        this._location = location;
    }

};


export { Patient, Location };
