import express from 'express'
const app = express()
import * as fs from "fs";

const ageGroupAvgData = JSON.parse(fs.readFileSync('./data/ageGroupAvgData.json', 'utf-8'));

app.get('/age-group-avg', (req: any, res: { send: (arg0: string) => void} ) => {
    console.log("age-group-avg");
        res.send(ageGroupAvgData)
        
    })
 
app.listen(3001)