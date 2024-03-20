import EmployeeRepository from '../repositories/employeeRepository';
import { Employee } from '../models/employee';

const employeeRepository = new EmployeeRepository();

export default class EmployeeService {

  getAll(): Employee[] {
    return employeeRepository.getAll();
  }

  add(employee: Employee): Employee {
    return employeeRepository.add(employee);
  }

  getById(id: number): Employee {
    const employee = employeeRepository.getById(id);
    
    if (employee === null) {
      throw new Error(`Cannot find employee with id: ${id}`);
    }

    return employee;
  }
}
