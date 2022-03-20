
export interface IPerson {
    age: number,
    county: string,
    jobRole : string,
    typeOfEmployer: string,
    education: number,
    workExperience: number,
    salary: number,
    unionOrganized: boolean 
}
export interface IToken {
    idToken:string
  }


export interface ILottery {
    fields : {
        name : string,
        description : string,
        dateTime : {
            timestampValue : string
        },
        participants : {
            arrayValue : {
            values : 
               IParticipant[]

           }
        }
    }
}

export interface IParticipant {
    mapValue: {
        fields: {
            name: {
                stringValue: string
            }
        }
    }
}

export interface IAgeAverage
 {
     groupName : string,
    avgSalary : number,
    organizedAmount : number
    nonOrganizedAmount : number
    organizedPercent : number
    avgEducation : number,  
    nonValidEducation : number,  
    avgWorkExperience : number,
    privateSectorAmount : number,
    privateSectorPercent : number,
    publicSectorAmount : number
    publicSectorPercent : number
    noSectorAmount : number
    groupSize : number,
    minMaxSalary : number[],
}