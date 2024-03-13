"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employeers {
    constructor() {
        this.employees = [];
    }
    getEmployeeById(employeeId) {
        return this.employees.find(employee => employee.id === employeeId);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    getEmployees() {
        return this.employees;
    }
}
exports.default = Employeers;
