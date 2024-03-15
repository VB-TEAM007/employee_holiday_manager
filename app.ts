import { HolidayRequest } from './models/holidayRequest';
import express from "express";
import bodyParser from 'body-parser';
import HolidayRequests from './storage/holidayRequests';
import {validateHolidayRequest} from './utils/validation'
import { Employee } from './models/employee';
import Employeers from './storage/emplioyeers';

const PORT = 3033;
const HOST = 'localhost';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const requests: HolidayRequest[] = [];
const Requests = new HolidayRequests();
const Employees = new Employeers();

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/add-employee', (req, res)  => {
  res.render('add-employee');
});

app.post('/add-employee', (req, res) => {
  const employees = Employees.getEmployees();
  const newEmployee = new Employee(employees.length, req.body.name, req.body.remainingHolidays);
  Employees.addEmployee(newEmployee);
  res.redirect('/employees');
});

app.get('/employees', (req, res)  => {
  const employees = Employees.getEmployees();
  res.render('employees', { employees });
});

app.get('/requests', (req, res)  => {
  const holidayRequests = Requests.getHolidayRequests();
  console.log(requests);
  res.render('requests', { holidayRequests });
});

app.get('/add-request', (req, res)  => {
  res.render('add-request');
});

app.post('/add-request', (req, res)  => {
    const holidayRequest = new HolidayRequest( requests.length , parseInt(req.body.employeeId), req.body.startDate, req.body.endDate);
    //console.log(holidayRequest.id);
    if (validateHolidayRequest(holidayRequest, Employees)){
    Requests.addHolidayRequest(holidayRequest);
    console.log(holidayRequest.id);
    res.redirect('/requests');
    }
    else res.render('add-request')
});

app.post('/approve-request', (req, res)  => {
  const requestId = req.body.requestId;
  const request = requests.find(req => req.employeeId === requestId);;
  if (request) {
    request.status = 'approved';
    res.redirect('/requests');
  }
});

app.post('/reject-request', (req, res)  => {
  const requestId = req.body.requestId;
  const request = requests.find(req => req.employeeId === requestId);;
  if (request) {
    request.status = 'rejected';
    res.redirect('/requests');
  }
});

app.post('/delete-request', (req, res) => {
  const requestId = req.body.employeeId;
  
});

app.get('*', (req, res)  => {
  res.status(404).render('error');
});

app.listen(PORT, HOST, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});