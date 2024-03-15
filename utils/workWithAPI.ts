import { HolidayResponse } from "../models/holidayResponseDtoAPI";
import axios from 'axios';

const BASE_URL = `https://date.nager.at/api/v3/PublicHolidays/2024/UA`;

export async function getAllHolidays(): Promise<HolidayResponse[]> {
  const response = await axios.get(BASE_URL);
  return response.data.map((holiday: any) => {
    return new HolidayResponse(
      new Date(holiday.date),
      holiday.localName,
      holiday.name,
      holiday.countryCode
    );
  });
}

async function getHolidaysInPeriod(): Promise<HolidayResponse[]> {
  const response = await getAllHolidays();
  const startDate: Date = new Date(2024, 2, 6);
  const endDate: Date = new Date(2024, 2, 9);

  return response.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate && holidayDate <= endDate;
  });
}

async function main() {
  try {
    const holidaysss = await getHolidaysInPeriod();
    console.log(holidaysss);
    console.log(holidaysss.length);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
