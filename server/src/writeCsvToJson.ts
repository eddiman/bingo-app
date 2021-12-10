const CSVToJSON = require("csvtojson");
import * as fs from "fs";

csvToJson("./data/raw/data", "./data/data");

function csvToJson(dataFileName : string, fileName : string) {
    CSVToJSON()
      .fromFile(dataFileName + ".csv")
      .then((data: any) => {
  
        fs.writeFile(fileName + ".json", JSON.stringify(data, null, 4), (err: any) => {
          if (err) {
            throw err;
          }
          console.log("JSON array is saved.");
        });
      })
      .catch((err: any) => {
        // log error if any
        console.log(err);
      });
  }
  