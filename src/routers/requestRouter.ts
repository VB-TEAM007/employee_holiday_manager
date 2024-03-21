import express, { query } from 'express';
import * as validation from '../utils/validation';
import { collections } from '../utils/database';
import Employee from '../models/employee';
import {ObjectId} from 'mongodb';
import HolidayRequest from '../models/holidayRequest';

const requestRouter = express.Router();

requestRouter.get('/requests', async (req, res)  => {
  const employees = (await collections.employee?.find({}).toArray()) as Employee[];
  const holidayRequests = (await collections.requests?.find({}).toArray()) as HolidayRequest[];
  res.render('requests', { holidayRequests, employees });
});

requestRouter.get('/add-request', async(req, res)  => {
  const employees = (await collections.employee?.find({}).toArray()) as Employee[];
  res.render('add-request', {employees} );
});

requestRouter.post('/add-request', async (req, res) => {
  const employee = await collections.employee?.findOne({ name: req.body.name });
    const newRequest: HolidayRequest = {
      employeeId: employee!._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: 'pending'
    }    
    if (await validation.validateHolidayRequest(newRequest)){
    await collections.requests?.insertOne(newRequest);
    res.render('add-request');
    }
    else
    res.redirect('/requests');
}); 

requestRouter.post('/approve-request/:id', async (req, res)  => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  await collections.requests?.updateOne(query, { $set: {status: 'approved'} });
  res.redirect('/requests');
});

requestRouter.post('/reject-request/:id', async(req, res)  => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  await collections.requests?.updateOne(query, { $set: {status: 'rejected'} });
  res.redirect('/requests');
});

requestRouter.post('/delete-request/:id', async(req, res) => {  
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  await collections.requests?.deleteOne(query);
  res.redirect('/requests');
});

requestRouter.get('/update-request/:id', (req, res) => {
  const id = req.params.id;
  res.render('update-request', {id});
})

requestRouter.post('/update-request/:id', async (req, res) =>{
  const id = req.params.id;   
  const request = await collections.requests?.findOne({ _id: new ObjectId(id)});
  if(await validation.validateHolidayRequest(request!)){
  await collections.requests?.updateOne({_id: new ObjectId(id)}, {
    $set: {
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }});
    res.redirect('/requests');
  }
  res.render('update-request', {id});
});

export default requestRouter;
