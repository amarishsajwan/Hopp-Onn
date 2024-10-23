"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsedTimeIST = (time) => {
    const today = new Date();
    console.log("today", today);
    const dateString = today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    // Combine today's date with the provided time from frontend (e.g., '11:35')
    const parsedTimeUTC = new Date(`${dateString}T${time}:00`);
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const parsedTimeIST = new Date(parsedTimeUTC.getTime() + istOffset);
    console.log("parsed time in IST:", parsedTimeIST);
    console.log("parsed time", parsedTimeIST);
    return parsedTimeIST;
};
exports.default = parsedTimeIST;
