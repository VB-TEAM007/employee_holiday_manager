import axios from "axios";
const CURRENT_YEAR = new Date().getFullYear();
const UKRAINE_COUNTRY_CODE = 'UA'
const BASE_URL = `https://date.nager.at/api/v3/PublicHolidays/${CURRENT_YEAR}/${UKRAINE_COUNTRY_CODE}`;

export async function getPublicHoildays() {
  try {
    const response = await axios.get(BASE_URL);
    const publicHolidays: { date: string, name: string, localName: string } [] 
      = response.data.map((holiday: { date: string, name: string, localName: string }) => (
        {
          date: new Date(holiday.date),
          name: holiday.name,
          localName: holiday.localName
        }
      )
    );

    return publicHolidays;
  } catch (error) {
    console.error('Error fetching public holidays:', error);
  }
}
