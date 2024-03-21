import HolidayRequest from "../models/holidayRequest";

export default class HolidayRequestRepository {
  private holidayRequests: HolidayRequest[] = [];

  async add(holidayRequest: HolidayRequest): Promise<HolidayRequest> {
    this.holidayRequests.push(holidayRequest);

    return this.holidayRequests[this.holidayRequests.length - 1];
  }

  getAll(): HolidayRequest[] {
    return this.holidayRequests;
  }

  getById(id: number): HolidayRequest | null {
    const request = this.holidayRequests as HolidayRequest;
    // .find(holidayRequest => holidayRequest.id === id);

    return request;
  }

  delete(id: number): void {
    this.holidayRequests.splice(id, 1);
  }
}
