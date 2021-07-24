'use strict';

let myForm=document.getElementById("myForm");
myForm.addEventListener("submit",render);
let contener= document.getElementById("contener");

function render(event){
event.preventDefault();
let name= event.target.Name.value;
let car=event.target.cars.value;
let Doors=event.target.Doors.value;
let featureSpeed=event.target.speed.checked;
let featureBreak=event.target.break.checked;
let color=event.target.color.value;
let date=event.target.date.value.split("-");

let nameEl=document.createElement("h1");
nameEl.textContent=name;

let carEl=document.createElement("h1");
carEl.textContent=car;

let DoorsEl=document.createElement("h1");
DoorsEl.textContent=Doors;

let featureEl1=document.createElement("h1");
let featureEl2=document.createElement("h1");
if (featureSpeed==true) {
    featureEl1.textContent="Speed";
}
if (featureBreak == true) {
    featureEl2.textContent="Break";
}
let colorEl=document.createElement("h1");
colorEl.textContent=color;

let dateEl=document.createElement("h1");
dateEl.textContent=`year: ${date[0]} month: ${date[1]} day ${date[2]}`;

contener.appendChild(nameEl);
contener.appendChild(carEl);
contener.appendChild(DoorsEl);
// contener.appendChild(featureEl1);
contener.appendChild(featureEl1);
contener.appendChild(featureEl2);
contener.appendChild(colorEl);
contener.appendChild(dateEl);
console.log(date);


}