"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(id, name, remainingHolidays) {
        this.id = 0;
        this.id = id++;
        this.name = name;
        this.remainingHolidays = remainingHolidays;
    }
}
exports.Employee = Employee;
