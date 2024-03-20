import express from 'express';
import { Employee } from '../models/employee';
import EmployeeService from '../services/employeeService';

const employeeService = new EmployeeService();
const employeeRouter = express.Router();

employeeRouter.get('/add-employee', (req, res)  => {
  res.render('add-employee');
});

employeeRouter.post('/add-employee', (req, res) => {
  const newEmployee = new Employee(
    employeeService.getAll().length,
    req.body.name,
    req.body.remainingHolidays
  );

  employeeService.add(newEmployee)
  res.redirect('employees');
});

employeeRouter.get('/employees', (req, res)  => {
  const employees = employeeService.getAll();
  res.render('employees', { employees });
});

export default employeeRouter;
