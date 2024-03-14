"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const holidayRequest_1 = require("./models/holidayRequest");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const holidayRequests_1 = __importDefault(require("./storage/holidayRequests"));
const validation_1 = require("./utils/validation");
const employee_1 = require("./models/employee");
const emplioyeers_1 = __importDefault(require("./storage/emplioyeers"));
const PORT = 3033;
const HOST = 'localhost';
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: true }));
const requests = [];
const Requests = new holidayRequests_1.default();
const Employees = new emplioyeers_1.default();
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/add-employee', (req, res) => {
    res.render('add-employee');
});
app.post('/add-employee', (req, res) => {
    const employees = Employees.getEmployees();
    const newEmployee = new employee_1.Employee(employees.length, req.body.name, req.body.remainingHolidays);
    Employees.addEmployee(newEmployee);
    res.redirect('/employees');
});
app.get('/employees', (req, res) => {
    const employees = Employees.getEmployees();
    res.render('employees', { employees });
});
app.get('/requests', (req, res) => {
    const holidayRequests = Requests.getHolidayRequests();
    console.log(requests);
    res.render('requests', { holidayRequests });
});
app.get('/add-request', (req, res) => {
    res.render('add-request');
});
app.post('/add-request', (req, res) => {
    const holidayRequest = new holidayRequest_1.HolidayRequest(requests.length, parseInt(req.body.employeeId), req.body.startDate, req.body.endDate);
    //console.log(holidayRequest.id);
    if ((0, validation_1.validateHolidayRequest)(holidayRequest, Employees)) {
        Requests.addHolidayRequest(holidayRequest);
        console.log(holidayRequest.id);
        res.redirect('/requests');
    }
    else
        res.render('add-request');
});
app.post('/approve-request', (req, res) => {
    const requestId = req.body.requestId;
    const request = requests.find(req => req.employeeId === requestId);
    ;
    if (request) {
        request.status = 'approved';
        res.redirect('/requests');
    }
});
app.post('/reject-request', (req, res) => {
    const requestId = req.body.requestId;
    const request = requests.find(req => req.employeeId === requestId);
    ;
    if (request) {
        request.status = 'rejected';
        res.redirect('/requests');
    }
});
app.post('/delete-request', (req, res) => {
    const requestId = req.body.employeeId;
});
app.get('*', (req, res) => {
    res.status(404).render('error');
});
app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
