<<<<<<< HEAD
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const holidayRequest_1 = require("./models/holidayRequest");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const holidayRequests_1 = __importDefault(require("./storage/holidayRequests"));
=======
const HolidayRequest = require('./holiday_management/holidayRequest');
const express = require('express');
const bodyParser = require('body-parser');
>>>>>>> a518ee1a9443ca8ae6e44cfc4b669dbfff97dc74
const PORT = 3033;
const HOST = 'localhost';
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: true }));
const requests = [];
const Requests = new holidayRequests_1.default();
const employees = [];
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/add-employee', (req, res) => {
    const newEmployee = {
        id: employees.length,
        name: req.body.name,
        remainingHolidays: req.body.remainingHolidays,
    };
    employees.push(newEmployee);
    res.redirect('/');
});
app.get('/add-employee', (req, res) => {
    res.render('add-employee');
});
app.get('/employees', (req, res) => {
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
    const holidayRequest = new holidayRequest_1.HolidayRequest(req.body.employeeId, req.body.startDate, req.body.endDate);
    Requests.addHolidayRequest(holidayRequest);
    res.redirect('/requests');
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
app.get('*', (req, res) => {
    res.status(404).render('error');
});
app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
