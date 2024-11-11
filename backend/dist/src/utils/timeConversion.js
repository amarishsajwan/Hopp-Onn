"use strict";
// const parsedTimeIST = (inputDateString: string) => {
//   const datetime = new Date(inputDateString);
//   console.log("in timeconversion function", datetime);
//   // Get the components of the date
//   const year = datetime.getFullYear();
//   const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//   const day = String(datetime.getDate()).padStart(2, "0");
//   const hours = String(datetime.getHours()).padStart(2, "0");
//   const minutes = String(datetime.getMinutes()).padStart(2, "0");
//   const seconds = String(datetime.getSeconds()).padStart(2, "0");
//   const milliseconds = String(datetime.getMilliseconds()).padStart(3, "0");
Object.defineProperty(exports, "__esModule", { value: true });
//   // Combine components into the ISO 8601 format
//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
// };
// export default parsedTimeIST;
// const parsedTimeIST = (inputDateString: string) => {
//   // Manually parse the input date string to handle single-digit days or months
//   const dateParts = inputDateString.split(/[\s,/:]+/);
//   if (dateParts.length < 6) {
//     console.log("Invalid input format for:", inputDateString);
//     return null; // Handle invalid format
//   }
//   // Extract parts based on known format: "D/M/YYYY, H:MM:SS am/pm"
//   const day = parseInt(dateParts[0], 10);
//   const month = parseInt(dateParts[1], 10) - 1; // JS months are zero-based
//   const year = parseInt(dateParts[2], 10);
//   let hours = parseInt(dateParts[3], 10);
//   const minutes = parseInt(dateParts[4], 10);
//   const seconds = parseInt(dateParts[5], 10);
//   const period = dateParts[6].toLowerCase();
//   // Adjust hours for 12-hour format
//   if (period === "pm" && hours < 12) {
//     hours += 12;
//   } else if (period === "am" && hours === 12) {
//     hours = 0;
//   }
//   // Create a Date object with the parsed values
//   const datetime = new Date(
//     Date.UTC(year, month, day, hours, minutes, seconds)
//   );
//   console.log("Parsed date:", datetime);
//   // Return the ISO 8601 formatted string
//   if (isNaN(datetime.getTime())) {
//     console.log("Invalid date:", inputDateString);
//     return null; // Handle invalid date
//   }
//   return datetime.toISOString();
// };
const parsedTimeIST = (inputDateString) => {
    const dateParts = inputDateString.split(/[\s,/:]+/);
    if (dateParts.length < 6) {
        console.log("Invalid input format for:", inputDateString);
        return null; // Handle invalid format
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS months are zero-based
    const year = parseInt(dateParts[2], 10);
    let hours = parseInt(dateParts[3], 10);
    const minutes = parseInt(dateParts[4], 10);
    const seconds = parseInt(dateParts[5], 10);
    const period = dateParts[6].toLowerCase();
    if (period === "pm" && hours < 12) {
        hours += 12;
    }
    else if (period === "am" && hours === 12) {
        hours = 0;
    }
    const datetime = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    console.log("Parsed date:", datetime);
    if (isNaN(datetime.getTime())) {
        console.log("Invalid date:", inputDateString);
        return null;
    }
    return datetime; // Return as Date object
};
exports.default = parsedTimeIST;
