import HolidayRequest from "../models/holidayRequest";
import { collections } from "../utils/database";
import { validateHolidayRequest } from "../utils/validation";
import { ObjectId } from 'mongodb';

export default class HolidayRequestService {

  async getAll(): Promise<HolidayRequest[]> {
    return await collections.requests?.find({}).toArray() as HolidayRequest[];
  }

  async getById(id: ObjectId): Promise<HolidayRequest> {
    return await collections.requests?.find({_id: id}) as HolidayRequest;
  }
  async getByArrayId(id: ObjectId): Promise<HolidayRequest[]> {
    return await collections.requests?.find({_id: id}).toArray() as HolidayRequest[];
  }

  async add(name: String, startDate: Date, endDate: Date): Promise<Boolean> {
    const employee = await collections.employee?.findOne({ name: name});
    const newRequest: HolidayRequest = {
      employeeId: employee!._id,
      startDate: startDate,
      endDate: endDate,
      status: 'pending'
    }    
    if (await validateHolidayRequest(newRequest)){
      await collections.requests?.insertOne(newRequest);
      return true;
    } else {
      return false;
    }
  }

  async updateStatus(id: ObjectId, status:String): Promise<void>{
    const query = { _id: id };
    await collections.requests?.updateOne(query, { $set: {status: status} });
  }

  async delete(id: ObjectId): Promise<void> {
    const query = { _id: id };
    await collections.requests?.deleteOne(query);
  }

  async updateRequest(id: string, startDate: Date, endDate: Date): Promise<Boolean>{
    const request = await this.getById(new ObjectId(id));
    if(await validateHolidayRequest(request!)){
    await collections.requests?.updateOne({_id: new ObjectId(id)}, {
      $set: {
        startDate: startDate,
        endDate: endDate
      }});
      return true;
    }
    return false;
  }
}
