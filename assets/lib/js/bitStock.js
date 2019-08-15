fetch("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=MRP2NZT5YSDMFLZB")
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    console.log(myJson);
    getLatest(myJson);
});

function getLatest(json) {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    let dd = current.getDate();
    let mm = current.getMonth() + 1;
    let year = current.getFullYear();
    if(dd < 10){
        dd = "0" + dd;
    }
    if(mm < 10){
        mm = "0" + mm;
    }

    let date = mm+"/"+dd+"/"+year;

    const open = document.getElementById("open");
    const close = document.getElementById("close");
    const high = document.getElementById("high");
    const low = document.getElementById("low");
    const vol = document.getElementById("vol");
    const marCap = document.getElementById("cap");
    const title = document.getElementById("ttl");

    title.innerHTML = "Bitcoin Daily Price and Volume - Last Updated: " + date;

    open.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['1a. open (USD)']).toFixed(2);
    close.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['4a. close (USD)']).toFixed(2);
    high.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['2a. high (USD)']).toFixed(2);
    low.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['3a. low (USD)']).toFixed(2);
    vol.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['5. volume']).toFixed(2);
    marCap.innerHTML = parseFloat(json['Time Series (Digital Currency Daily)'][year+'-'+mm+'-'+dd]['6. market cap (USD)']).toFixed(2);
}