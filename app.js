'use strict';

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let tableContener = document.getElementById("tableContener");
let tfoot = document.createElement("tfoot");


// let cusPerHours = [];
// let avgCookiesPerHours = [];
let listOfShops = [];
function Shops(loc, min, max, avg) {
    this.loc = loc;
    this.minHoursPerCus = min;
    this.maxHoursPerCus = max;
    this.avgHoursPerCus = avg;
    this.totle = 0;
    this.avgCookiesPerHours = [];
    this.cusPerHours = [];
    listOfShops.push(this);

}
Shops.prototype.getRandomCusPerHours = function () {
    for (let i = 0; i < hours.length; i++) {
        let min = Math.ceil(this.minHoursPerCus);
        let max = Math.floor(this.maxHoursPerCus);
        this.cusPerHours.push(Math.floor(Math.random() * (max - min + 1) + min)); //The maximum is inclusive and the minimum is inclusive
    }

};
Shops.prototype.getAvgCookiesPerHours = function () {
    for (let i = 0; i < hours.length; i++) {
        // this.avgCookiesPerH[i] = Math.ceil(this.randCust[i] * this.avgCookies);
        // this.avgCookiesPerHours[i]= Math.ceil(cusPerHours[i] * Shops.avgHoursPerCus );
        this.avgCookiesPerHours.push(Math.ceil(this.cusPerHours[i] * this.avgHoursPerCus));
        this.totle = this.totle + this.avgCookiesPerHours[i];
    }
}
Shops.prototype.render = function () {
    let divContener = document.getElementById("contener");
    let ulEl = document.createElement("ul");
    for (let i = 0; i < hours.length; i++) {
        let liEL = document.createElement("li");
        liEL.textContent = ` ${hours[i]} : ${avgCookiesPerHours[i]} Cookies `;
        ulEl.appendChild(liEL);
    }
    let totleEl = document.createElement("p");
    totleEl.textContent = this.totle;

    divContener.appendChild(ulEl);
    divContener.appendChild(totleEl);
    // 6am: 16 cookies
}
function renderFirstRawTable () {
    let theadEl = document.createElement("thead");
    let trhEl = document.createElement("tr");
    let thEl = document.createElement("th");
    thEl.textContent = " Loc ";
    trhEl.appendChild(thEl);
    for (let i = 0; i < hours.length; i++) {
        let thEl = document.createElement("th");
        thEl.textContent = hours[i];
        trhEl.appendChild(thEl);
    }
    let thElLast = document.createElement("th");
    thElLast.textContent = " Totel:  ";
    trhEl.appendChild(thElLast);
    theadEl.appendChild(trhEl);
    tableContener.appendChild(theadEl);
}

Shops.prototype.renderTable = function () {

    let tbody = document.createElement("tbody");
    let trb = document.createElement("tr");

    let tb = document.createElement("tb");
    tb.textContent = this.loc;
    trb.appendChild(tb);
    for (let i = 0; i < hours.length; i++) {
        let td = document.createElement("td");
        td.textContent = this.avgCookiesPerHours[i];
        trb.appendChild(td);
    }
    let tbLast = document.createElement("tb");
    tbLast.textContent = this.totle;
    trb.appendChild(tbLast);
    tbody.appendChild(trb);

    tableContener.appendChild(tbody);
}
function renderLastRawTable() {
    // let tfoot = document.createElement("tfoot");
     tfoot.textContent="";

    let trhEl = document.createElement("tr");
    let thEl = document.createElement("th");
    thEl.textContent = " Totel :  ";
    trhEl.appendChild(thEl);
    let totelOfSum=0;
    for (let i = 0; i < hours.length; i++) {
        let thEl = document.createElement("th");
        let sum=0;
        for (let j = 0; j < listOfShops.length; j++) {
            sum=sum+ listOfShops[j].avgCookiesPerHours[i];
            
        }
        totelOfSum+=sum;
        thEl.textContent = sum;
        trhEl.appendChild(thEl);
    }
    let thElLast = document.createElement("th");
    thElLast.textContent =totelOfSum ;
    trhEl.appendChild(thElLast);
    
    tfoot.appendChild(trhEl);
    tableContener.appendChild(tfoot);
}
let submitEl=document.getElementById("submit");

function addShops(event){
    event.preventDefault();
        let shopName=event.target.shopName.value;
    let min=event.target.min.value;
    let max=event.target.max.value;
    let avg=event.target.avg.value;

    let newShop=new Shops(shopName,min,max,avg);
    newShop.getRandomCusPerHours();
    newShop.getAvgCookiesPerHours();
    newShop.renderTable();
    renderLastRawTable();

}
let sel = new Shops("set", 5, 19, 2.5);
sel.getRandomCusPerHours();
sel.getAvgCookiesPerHours();
renderFirstRawTable();
sel.renderTable();
let olq = new Shops("olq", 20, 50, 5.5);
olq.getRandomCusPerHours();
olq.getAvgCookiesPerHours();
// olq.renderFirstRawTable();
olq.renderTable();
// // sel.render();
// olq.renderTable();
renderLastRawTable();
submitEl.addEventListener("submit",addShops);
console.log(this.cusPerHours);
console.log(this.avgCookiesPerHours);
