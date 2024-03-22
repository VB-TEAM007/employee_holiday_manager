import HolidayRequest from "../models/holidayRequest";
import { HolidayResponse } from "../models/holidayResponse";
import { getPublicUkrainianHoildays } from "./workWithAPI";
import EmployeeService from "../services/employeeService";
import HolidayRequestService from "../services/holidayRequestService";
import { collections } from "./database";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const holidayRequestService =  new HolidayRequestService();
const employeeService = new EmployeeService();

export async function validateHolidayRequest(request: HolidayRequest): Promise<boolean> { 
  const employee = await employeeService.getById(request.employeeId!);
  const today: Date = new Date();
  const startDate: Date = new Date(request.startDate!);
  const endDate: Date = new Date(request.endDate!);

  const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
  const publicHolidays = await getPublicUkrainianHoildays();
  const holidaysBetweenDates = await getHolidaysBetweenDates(startDate, endDate);

  if (startDate <= today) {
    console.log('Start date cannot be earlier than today date');
    return false;
  }

  if (await hasAlreadyBookingInThisPeriod(request)) {
    console.log(`User already have some request in this period`);
    return false;
  }

  if (totalDaysRequested > employee.remainingHolidays!) {
    console.log('Holiday request exceeds the maximum consecutive days allowed');
    return false;
  }

  if (publicHolidays) {
    if (holidaysBetweenDates.length > 1){
      employee!.remainingHolidays = +employee.remainingHolidays! + +holidaysBetweenDates.length;
      console.log(`your request falls on ${JSON.stringify(holidaysBetweenDates)} holiday,
         ${holidaysBetweenDates.length} day(s) has been added to your possible vacation days`);
    }
  }
  
  employee!.remainingHolidays = employee!.remainingHolidays! - totalDaysRequested;

  return true;
}

async function getHolidaysBetweenDates(startDate: Date, endDate: Date): Promise<HolidayResponse[]> {
  try {
    const publicHolidays: HolidayResponse[] | undefined = await getPublicUkrainianHoildays();
    
    if (!publicHolidays) {
      throw new Error('Failed to fetch public holidays');
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    const holidaysBetweenDates: HolidayResponse[] = [];

    publicHolidays.forEach(holiday => {
      const holidayDate = new Date(holiday.date);
      if (holidayDate >= start && holidayDate <= end) {
        holidaysBetweenDates.push(holiday);
      }
    });

    return holidaysBetweenDates;
  } catch (error) {
    console.error('Error fetching public holidays:', error);
    return [];
  }
}

async function hasAlreadyBookingInThisPeriod(request: HolidayRequest): Promise<boolean> {
  const requests: HolidayRequest[] = await collections.requests?.find({employeeId: request.employeeId}).toArray() as HolidayRequest[];
  requests.forEach(existingRequest => {
    if ((request.startDate! >= existingRequest.startDate! && request.startDate! <= existingRequest.endDate!) ||
    (request.endDate! >= existingRequest.startDate! && request.endDate! <= existingRequest.endDate!) ||
    (request.startDate! <= existingRequest.startDate! && request.endDate! >= existingRequest.endDate!)) {
        console.log('Employee already have holiday request in this period')
        return false
      }
    });
  return true;
}

