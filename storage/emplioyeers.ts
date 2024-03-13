import {Employee } from '../models/employee';

export default class Employeers {
    getEmployeeById(employeeId: number) {
        return this.employees.find(employee => employee.id === employeeId);
    }
    
    private  employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getEmployees(): Employee[] {
        return this.employees;
    }
}