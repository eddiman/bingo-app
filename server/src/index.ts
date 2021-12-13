// require csvtojson module
const CSVToJSON = require("csvtojson");
import * as fs from "fs";


const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

let newPersonArray : IPerson[] = new Array();

data.map((dataPerson: any[]) => {
let newPerson : IPerson = {
    age: convertAge(Object.values(dataPerson)[0]),
    county: Object.values(dataPerson)[1],
    jobRole : Object.values(dataPerson)[2],
    typeOfEmployer: Object.values(dataPerson)[3],
    education: isNaN(Object.values(dataPerson)[4]) ? -1 : Number(Object.values(dataPerson)[4]),
    workExperience: Number(Object.values(dataPerson)[5]),
    salary: convertSalary(Object.values(dataPerson)[8]),
    unionOrganized: Object.values(dataPerson)[11] === "Ja" ? true : false 
};


newPersonArray.push(newPerson);

}); 
arrayToJsonFile("./data/parsedData", newPersonArray)



function convertSalary(salary : string) {
    const cleanSalary = salary.replace(/[^0-9]/g,'');
    //"425 000,00 kr" = "42500000"
    const splicedSalary = cleanSalary.slice(0, -2);
    //Slices the last two zeros
    //"42500000 = "425000"

    return Number(splicedSalary)
}

function convertAge(age : string) {
    const cleanAge = age.replace(/[^0-9]/g,'');
    //"20-24 år" = "2024"
    const slicedAge = cleanAge.slice(0,2);
    //"2024" = "20"

    return Number(slicedAge) + 1;
}

function arrayToJsonFile(fileName : string, array : any) {
    fs.writeFile(fileName + ".json", JSON.stringify(array, null, 4), (err: any) => {
        if (err) {
          throw err;
        }
        console.log("JSON array is saved.");
      });
}





