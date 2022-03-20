import express from 'express'
const app = express()
import fetch from 'node-fetch';
import { ILottery, IParticipant, IToken } from './interfaces/interfaces';
import * as fs from "fs";



async function api<T>(url: string, options: {}): Promise<T> {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })
        .then(data => {
            console.log(data);

            return data;
        })
}

app.get('/token', (req: any, res: { send: (arg0: string) => void }) => {
    const body = JSON.stringify({ "email": "admin@vinlotteriet.no", "password": "vinlotteri", "returnSecureToken": true });
    const tokenHeaders = {
        method: 'post',
        body: body,
        headers: { 'Content-Type': 'application/json' }
    };


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcFWA4yGr1yotwO0uwkbiWNpWCujWK8d8', tokenHeaders)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<IToken>
        })
        .then(tokenData => {
            console.log(tokenData.idToken);
            fetch('https://firestore.googleapis.com/v1/projects/evry-wine-lottery/databases/(default)/documents/lotteries/' + req.query.id, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + tokenData.idToken }
            }).then(dataResponse => {
                return dataResponse.json() as Promise<ILottery>

            }).then(final => {
                //console.log(final.fields.participants.arrayValue.values[0].mapValue.fields.name.stringValue);
                let bingoArray  = [];
                for (let i = 0; i < final.fields.participants.arrayValue.values.length; i++) {
                    let part: IParticipant = final.fields.participants.arrayValue.values[i];
                    console.log(part.mapValue.fields.name.stringValue);

                    let bingoTuple = { "word": part.mapValue.fields.name.stringValue }
                    bingoArray.push(bingoTuple)
                }
                res.send(JSON.stringify(bingoArray))

            })

        })



})


app.listen(3001); 