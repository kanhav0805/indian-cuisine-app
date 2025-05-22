import fs from "fs";
import csv from "csv-parser";

//this is the utility function to get the json data from the csv by passing the file path
export const loadCSVData = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};
