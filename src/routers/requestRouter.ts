import express from 'express';
import { HolidayRequest } from '../models/holidayRequest';
import EmployeeRepository from '../repositories/employeeRepository';
import HolidayRequestService from '../services/holidayRequestService';
import * as validation from '../utils/validation';

const requestRouter = express.Router();

const employeesRepository = new EmployeeRepository();
const requestService = new HolidayRequestService();

requestRouter.get('/requests', async (req, res)  => {
  res.render('requests', { holidayRequests: requestService.getAll() });
});

requestRouter.get('/add-request', (req, res)  => {
  res.render('add-request');
});

requestRouter.post('/add-request', async (req, res) => {
    const holidayRequest = new HolidayRequest(
      employeesRepository.getAll().length,
      parseInt(req.body.employeeId),
      req.body.startDate,
      req.body.endDate
    );

    const addedRequest = await requestService.add(holidayRequest);
    
    if (addedRequest !== null) {
      res.redirect('/requests');
    } else {
      console.error('Error. Try write correct request');
      res.render('add-request')
    }
}); 

requestRouter.post('/approve-request/:id', (req, res)  => {
  const request = requestService.getById(parseInt(req.params.id));

  if (request) {
    request.status = 'approved';
  }  

  res.redirect('/requests');
});

requestRouter.post('/reject-request/:id', (req, res)  => {
  const request = requestService.getById(parseInt(req.params.id));

  if (request) {
    request.status = 'rejected';
  }  

  res.redirect('/requests');
});

requestRouter.post('/delete-request/:id', (req, res) => {  
  requestService.delete(req.body.id);

  res.redirect('/requests');
});

requestRouter.get('/update-request/:id', (req, res) => {
  const id = req.params.id;

  res.render('update-request', {id});
})

requestRouter.post('/update-request/:id', async (req, res) =>{
  const id = req.params.id;
  const request = requestService.getById(parseInt(id));

  if (request) {
    request.startDate = req.body.startDate;
    request.endDate = req.body.endDate;

    if (await validation.validateHolidayRequest(request)) {
      res.redirect('/requests');
    }
  }

  res.render('update-request', {id});
})

export default requestRouter;
