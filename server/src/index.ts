import express from 'express'
const app = express()
import * as fs from "fs";

const ageGroupAvgData = JSON.parse(fs.readFileSync('./data/ageGroupAvgData.json', 'utf-8'));

app.get('/AgeGroupAvg', (req: any, res: { send: (arg0: string) => void} ) => {
        res.send(ageGroupAvgData)
    })
 
app.listen(3001)