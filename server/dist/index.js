"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// require csvtojson module
const CSVToJSON = require("csvtojson");
const fs = __importStar(require("fs"));
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
let newPersonArray = new Array();
data.map((dataPerson) => {
    let newPerson = {
        age: convertAge(Object.values(dataPerson)[0]),
        county: Object.values(dataPerson)[1],
        jobRole: Object.values(dataPerson)[2],
        typeOfEmployer: Object.values(dataPerson)[3],
        education: isNaN(Object.values(dataPerson)[4]) ? -1 : Number(Object.values(dataPerson)[4]),
        workExperience: Number(Object.values(dataPerson)[5]),
        salary: convertSalary(Object.values(dataPerson)[8]),
        unionOrganized: Object.values(dataPerson)[11] === "Ja" ? true : false
    };
    newPersonArray.push(newPerson);
});
arrayToJsonFile("./data/parsedData", newPersonArray);
function convertSalary(salary) {
    const cleanSalary = salary.replace(/[^0-9]/g, '');
    //"425 000,00 kr" = "42500000"
    const splicedSalary = cleanSalary.slice(0, -2);
    //Slices the last two zeros
    //"42500000 = "425000"
    return Number(splicedSalary);
}
function convertAge(age) {
    const cleanAge = age.replace(/[^0-9]/g, '');
    //"20-24 år" = "2024"
    const slicedAge = cleanAge.slice(0, 2);
    //"2024" = "20"
    return Number(slicedAge) + 1;
}
function arrayToJsonFile(fileName, array) {
    fs.writeFile(fileName + ".json", JSON.stringify(array, null, 4), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON array is saved.");
    });
}
