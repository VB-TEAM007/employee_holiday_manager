import { Employee } from '../models/employee';

export default class Employeers {
  private employees: Employee[] = [];
    
  getEmployeeById( employeeId: number) {
    return this.employees.find(employee => employee.id === employeeId);
  }
  
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
}
