import HolidayRequestRepository from "../repositories/holidayRequestRepository";
import HolidayRequest from "../models/holidayRequest";
import { validateHolidayRequest } from "../utils/validation";

const holidayRequestRepository = new HolidayRequestRepository();

export default class HolidayRequestService {

  getAll(): HolidayRequest[] {
    return holidayRequestRepository.getAll();
  }

  getById(id: number): HolidayRequest | null {
    const request = holidayRequestRepository.getById(id);

    return request;
  }

  // async add(request: HolidayRequest): Promise<HolidayRequest | null> {
  //   if (await validateHolidayRequest(request)) {
  //     try {
  //       const addedRequest = await holidayRequestRepository.add(request);
        
  //       return addedRequest;
  //     } catch (error) {
  //       console.error('Error adding holiday request:', error);
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  delete(id: number): void {
    if (this.getAll().length - 1 >= id) {
      holidayRequestRepository.delete(id);
    } else {
      throw new Error(`Cannot delete request by id: ${id}`);
    }
  }
}
