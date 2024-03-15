"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HolidayRequests {
    constructor() {
        this.holidayRequests = [];
    }
    addHolidayRequest(holidayRequest) {
        this.holidayRequests.push(holidayRequest);
    }
    getHolidayRequests() {
        return this.holidayRequests;
    }
    getHolidayById(id) {
        return this.holidayRequests.find(holidayRequest => parseInt(holidayRequest.id.toString()) === id);
    }
    deleteHolidayRequests(id) {
        return this.holidayRequests.splice(id, 1);
    }
}
exports.default = HolidayRequests;
