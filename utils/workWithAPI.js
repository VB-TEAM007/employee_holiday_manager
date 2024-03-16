"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countHolidaysBetweenDates = exports.getPublicHoildays = void 0;
const axios_1 = __importDefault(require("axios"));
const CURRENT_YEAR = new Date().getFullYear();
const UKRAINE_COUNTRY_CODE = 'UA';
const BASE_URL = `https://date.nager.at/api/v3/PublicHolidays/${CURRENT_YEAR}/${UKRAINE_COUNTRY_CODE}`;
function getPublicHoildays() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(BASE_URL);
            const publicHolidays = response.data.map((holiday) => ({
                date: new Date(holiday.date),
                name: holiday.name,
                localName: holiday.localName
            }));
            return publicHolidays;
        }
        catch (error) {
            console.error('Error fetching public holidays:', error);
        }
    });
}
exports.getPublicHoildays = getPublicHoildays;
function countHolidaysBetweenDates(holidays, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    holidays.forEach(holiday => {
        const holidayDate = new Date(holiday.date);
        if (holidayDate >= start && holidayDate <= end) {
            count++;
        }
    });
    return count;
}
exports.countHolidaysBetweenDates = countHolidaysBetweenDates;
