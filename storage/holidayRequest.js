class HolidayRequest {
  constructor(data) {
      this.employeeId = data.employeeId;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.status = data.status || 'pending';
  }
}

module.exports = HolidayRequest;