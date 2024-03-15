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
exports.getAllHolidays = void 0;
const holidayResponseDtoAPI_1 = require("../models/holidayResponseDtoAPI");
const axios_1 = __importDefault(require("axios"));
const BASE_URL = `https://date.nager.at/api/v3/PublicHolidays/2024/UA`;
function getAllHolidays() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(BASE_URL);
        return response.data.map((holiday) => {
            return new holidayResponseDtoAPI_1.HolidayResponse(new Date(holiday.date), holiday.localName, holiday.name, holiday.countryCode);
        });
    });
}
exports.getAllHolidays = getAllHolidays;
function getHolidaysInPeriod() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield getAllHolidays();
        const startDate = new Date(2024, 2, 6);
        const endDate = new Date(2024, 2, 9);
        return response.filter(holiday => {
            const holidayDate = new Date(holiday.date);
            return holidayDate >= startDate && holidayDate <= endDate;
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const holidaysss = yield getHolidaysInPeriod();
            console.log(holidaysss);
            console.log(holidaysss.length);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
main();
