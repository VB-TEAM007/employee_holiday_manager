"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayRequest = void 0;
class HolidayRequest {
    constructor(id, employeeId, startDate, endDate) {
        this.id = id;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}
exports.HolidayRequest = HolidayRequest;
