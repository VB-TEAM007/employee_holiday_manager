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
}
exports.default = HolidayRequests;
