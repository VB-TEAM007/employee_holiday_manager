import Employee from '../models/employee';

export default class EmployeeRepository {
  private employees: Employee[] = [];
    
  getById(id: number): Employee | null {
    const employee = this.employees as Employee;
    // .find(employee => employee.id === id);

    return employee;
    //  !== undefined ? employee : null;
  }
  
  add(employee: Employee): Employee {
    this.employees.push(employee);

    return this.employees[this.employees.length - 1];
  }

  getAll(): Employee[] {
    return this.employees;
  }
}
