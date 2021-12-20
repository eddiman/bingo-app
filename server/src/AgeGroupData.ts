import * as fs from "fs";
import { CLIENT_RENEG_WINDOW } from "tls";

const data = JSON.parse(fs.readFileSync('./data/parsedData.json', 'utf-8')) as IPerson[];


let group2024: IPerson[] = [];
let group2529: IPerson[] = [];
let group3034: IPerson[] = [];
let group3539: IPerson[] = [];
let group4044: IPerson[] = [];
let group4549: IPerson[] = [];
let group50Plus: IPerson[] = [];

const ageGroups: IPerson[][] = [group2024, group2529, group3034, group3539, group4044, group4549, group50Plus]

const ageLimits: number[] = [25, 30, 35, 40, 45, 50, 999]

let finalAgeGroups = [];

sortAgeGroups();

function sortAgeGroups() {
    for (let i = 0; i < ageGroups.length; i++) {
        let filtered: any[] = [];
        if (i === 0) {
            filtered = data.filter((e) => {
                return e.age < ageLimits[i];
            });
        } else {
            filtered = data.filter((e) => {
                return e.age > ageLimits[i - 1] && e.age < ageLimits[i];
            });
        }
        ageGroups[i] = filtered;
    }
}

console.log(ageGroups.length);

for (let i = 0; i < ageGroups.length; i++) {
    let group: IPerson[] = ageGroups[i];

    let acumulatedSalary = 0;
    let organizedAmount = 0
    let accumulatedWorkExperience = 0;
    let accumulatedEducation = 0;
    let nonValidEducationAmount = 0;

    let publicSectorAmount = 0
    let privateSectorAmount = 0
    let noSectorAmount = 0

    for (let j = 0; j < group.length; j++) {
        let dataPerson: IPerson = group[j];

        acumulatedSalary = acumulatedSalary + dataPerson.salary;
        organizedAmount = dataPerson.unionOrganized ? organizedAmount + 1 : organizedAmount;
        accumulatedWorkExperience = accumulatedWorkExperience + dataPerson.workExperience;
        accumulatedEducation = dataPerson.education !== -1 ? accumulatedEducation + dataPerson.education : accumulatedEducation;
        nonValidEducationAmount = dataPerson.education === -1 ? nonValidEducationAmount + 1 : nonValidEducationAmount;

        publicSectorAmount = dataPerson.typeOfEmployer === "offentlig" ? publicSectorAmount + 1 : publicSectorAmount;
        privateSectorAmount = dataPerson.typeOfEmployer === "privat" ? privateSectorAmount + 1 : privateSectorAmount;
        noSectorAmount = dataPerson.typeOfEmployer === "ikke oppgitt" ? noSectorAmount + 1 : noSectorAmount;

    }

    let ageGroupAverage: IAgeAverage = {
        groupName: ageGroups[i + 1] && ageGroups[i + 1][0] ? (ageGroups[i][0].age - 1) + " - " + (ageGroups[i + 1][0].age - 2) + " år" : "+ år",
        avgSalary: round(acumulatedSalary / group.length, 0),
        organizedAmount: organizedAmount,
        avgWorkExperience: round(accumulatedWorkExperience / group.length, 2),
        avgEducation: round(accumulatedEducation / (group.length - nonValidEducationAmount), 2),
        nonValidEducation: nonValidEducationAmount,
        privateSectorAmount: privateSectorAmount,
        publicSectorAmount: publicSectorAmount,
        noSectorAmount: noSectorAmount,
        groupSize: group.length,

    }
    finalAgeGroups.push(ageGroupAverage);
}
console.log(finalAgeGroups)

arrayToJsonFile("./data/ageGroupAvgData", finalAgeGroups)


function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function arrayToJsonFile(fileName: string, array: any) {
    fs.writeFile(fileName + ".json", JSON.stringify(array, null, 4), (err: any) => {
        if (err) {
            throw err;
        }
        console.log("JSON array is saved.");
    });


    function compareAge(age: number, compareValue: number) {
        if (age < compareValue) {
            return true;
        } else {
            return false
        }
        return false
    }
}
