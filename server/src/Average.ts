import * as fs from "fs";

const data = JSON.parse(fs.readFileSync('./data/parsedData.json', 'utf-8')) as IPerson[];




let group2024: IPerson[] = [];
let group2529: IPerson[] = [];
let group3034: IPerson[] = [];
let group3540: IPerson[] = [];
let group4150: IPerson[] = [];
let group50Plus: IPerson[] = [];

let ageGroups: IPerson[][] = [group2024, group2529, group3034, group3540, group4150, group50Plus]

let finalGroups : IAgeAverage[]; 

const ageLimits: number[] = [25, 30, 35, 41, 50, 999]

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
        organizedAmount = dataPerson.unionOrganized ? organizedAmount++ : organizedAmount;
        accumulatedWorkExperience = accumulatedWorkExperience + dataPerson.workExperience;
        accumulatedEducation = dataPerson.education !== -1 ? accumulatedEducation + dataPerson.education : accumulatedEducation;
        nonValidEducationAmount = dataPerson.education === -1 ? nonValidEducationAmount++ : nonValidEducationAmount;

        publicSectorAmount = dataPerson.typeOfEmployer === "offentlig" ? publicSectorAmount++ : publicSectorAmount; 
        privateSectorAmount = dataPerson.typeOfEmployer === "privat" ? privateSectorAmount++ : privateSectorAmount; 
        noSectorAmount = dataPerson.typeOfEmployer === "ikke oppgitt" ? noSectorAmount++ : noSectorAmount; 

    }

    let ageGroupAverage : IAgeAverage = {
        avgSalary: acumulatedSalary / group.length,
        organizedAmount: organizedAmount,
        avgWorkExperience: accumulatedWorkExperience / group.length,
        avgEducation: accumulatedEducation / (group.length - nonValidEducationAmount),
        privateSectorAmount: privateSectorAmount,
        publicSectorAmount: publicSectorAmount,
        noSectorAmount: noSectorAmount,
    } 
console.log(ageGroupAverage)
}



function compareAge(age: number, compareValue: number) {
    if (age < compareValue) {
        return true;
    } else {
        return false
    }
    return false
}

/*
ageGroup:
    avgSalary
    organizedAmount
    avgEducation
    avgWorkExperience
    privateSectorAmount
    publicSectorAmount



*/