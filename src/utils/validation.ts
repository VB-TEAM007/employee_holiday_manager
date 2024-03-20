import { HolidayRequest } from "../models/holidayRequest";
import { HolidayResponse } from "../models/holidayResponse";
import { getPublicUkrainianHoildays } from "./workWithAPI";
import EmployeeService from "../services/employeeService";
import HolidayRequestRepository from "../repositories/holidayRequestRepository";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const employeeService = new EmployeeService();
const requestRepository = new HolidayRequestRepository();

export async function validateHolidayRequest(request: HolidayRequest): Promise<boolean> {  
  const employee = employeeService.getById(request.employeeId);

  const today: Date = new Date();
  const startDate: Date = new Date(request.startDate);
  const endDate: Date = new Date(request.endDate);

  const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
  const publicHolidays = await getPublicUkrainianHoildays();
  const holidaysBetweenDates = await getHolidaysBetweenDates(startDate, endDate);

  if (employee === null) {
    console.log('Employee with this ID is not found');
    return false;
  }

  if (startDate <= today) {
    console.log('Start date cannot be earlier than today date');
    return false;
  }

  if (!hasAlreadyBookingInThisPeriod(request)) {
    console.log(`User already have some request in this period from ${startDate} to ${endDate}`);
    return false;
  }

  if (totalDaysRequested > employee.remainingHolidays) {
    console.log('Holiday request exceeds the maximum consecutive days allowed');
    return false;
  }

  if (publicHolidays) {
    if (holidaysBetweenDates.length > 1){
      employee.remainingHolidays = +employee.remainingHolidays + +holidaysBetweenDates.length;
      console.log(`your request falls on ${JSON.stringify(holidaysBetweenDates)} holiday,
         ${holidaysBetweenDates.length} day(s) has been added to your possible vacation days`);
    }
  }
  
  employee.remainingHolidays = employee.remainingHolidays - totalDaysRequested;

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

function hasAlreadyBookingInThisPeriod(request: HolidayRequest): boolean {
  const requests = requestRepository.getAll();

  for (const existingRequest of requests) {
    if (existingRequest.employeeId === request.employeeId) {
      if (request.startDate >= existingRequest.startDate 
          && request.endDate <= existingRequest.endDate) {
        console.log('Employee already have holiday request in this period')
        return false
      }
    }
  }
  return true;
}
