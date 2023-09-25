const axios = require('axios');
const express = require('express');
const app = express();
let port = 2137;

let array = [];


function GetApi() {

axios.get('http://api.nbp.pl/api/exchangerates/tables/A')
    .then(response => {
        var data = response.data[0];
        array = [];
        data.rates.forEach(element => {
            if(element.code == "USD" || element.code == "EUR" || element.code == "GBP")
                array.push(element);
        });
        console.log(array);
    })
    .catch(error => {
        console.log("Error:" + error.message);
    });

};
GetApi();
setInterval(GetApi, 300000);

app.get('/dolar', (req, res) => {
    res.json( array[0].mid);
});

app.get('/euro', (req, res) => {
    res.json( array[1].mid);
});

app.get('/funt', (req, res) => {
    res.json( array[2].mid);
});

app.listen(port, () => {
    console.log('Serwer działa na porcie:' + port)
});