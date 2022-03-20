var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import express from 'express';
var app = express();
import fetch from 'node-fetch';
function api(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(url, options)
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                    .then(function (data) {
                    console.log(data);
                    return data;
                })];
        });
    });
}
app.get('/token', function (req, res) {
    var body = JSON.stringify({ "email": "admin@vinlotteriet.no", "password": "vinlotteri", "returnSecureToken": true });
    var tokenHeaders = {
        method: 'post',
        body: body,
        headers: { 'Content-Type': 'application/json' }
    };
    /*
    
    const tokenResponse = await
    const tokenData = await tokenResponse.json() as IToken;
    const token = tokenData.idToken;

    
    const lotteryData = await fetch('https://firestore.googleapis.com/v1/projects/evry-wine-lottery/databases/(default)/documents/lotteries/'+ req.query.id , {
        method: 'get',
        body: body,
        headers: {'Content-Type': 'application/json', 'Authorization': token }
    });
*/
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcFWA4yGr1yotwO0uwkbiWNpWCujWK8d8', tokenHeaders)
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(function (tokenData) {
        console.log(tokenData.idToken);
        fetch('https://firestore.googleapis.com/v1/projects/evry-wine-lottery/databases/(default)/documents/lotteries/' + req.query.id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + tokenData.idToken }
        }).then(function (dataResponse) {
            return dataResponse.json();
        }).then(function (final) {
            //console.log(final.fields.participants.arrayValue.values[0].mapValue.fields.name.stringValue);
            var bingoArray = [];
            for (var i = 0; i < final.fields.participants.arrayValue.values.length; i++) {
                var part = final.fields.participants.arrayValue.values[i];
                console.log(part.mapValue.fields.name.stringValue);
                var bingoTuple = { "word": part.mapValue.fields.name.stringValue };
                bingoArray.push(bingoTuple);
            }
            res.send(JSON.stringify(bingoArray));
        });
    });
});
app.listen(3001);
