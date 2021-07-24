'use strict';
let contener = document.getElementById("contener");
let myForm = document.getElementById("myForm");

let articles = [];
function Article(author, title, content, subject, day, month, year) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.subject = subject;
    this.day = day;
    this.month = month;
    this.year = year;
    // this.id=1;
    this.id += ++Article.id;
    this.number = 0;
    this.likes = Math.floor(Math.random() * (500 - 1 + 1) + 1);

    articles.push(this);

}
// Article.prototype.genertaID = function () {
//     this.id += this.id + 1;
// }
Article.prototype.renderINI=function () {
    let divSub = document.createElement("div");
    divSub.setAttribute("id", "divSub");
    let h1El = document.createElement("h1");
    h1El.textContent = this.title;
    divSub.appendChild(h1El);
    let pAuthorEl = document.createElement("p");
    pAuthorEl.textContent = this.author;
    divSub.appendChild(pAuthorEl);
    let pDateEl = document.createElement("p");
    pDateEl.textContent = `Date: ${this.day}-${this.month}-${this.year}`;
    divSub.appendChild(pDateEl);
    contener.appendChild(divSub);
    
}

function render(event) {
    event.preventDefault();
    let author = event.target.author.value;
    let title = event.target.title.value;
    let content = event.target.content.value;
    let subject = event.target.subject.value;
    let day = event.target.day.value;
    let month = event.target.month.value;
    let year = event.target.year.value;
    let newone=new Article(author, title, content, subject, day, month, year);
    newone.renderINI();
    // let divSub = document.createElement("div");
    // divSub.setAttribute("id", "divSub");
    // let h1El = document.createElement("h1");
    // h1El.textContent = title;
    // divSub.appendChild(h1El);
    // let pAuthorEl = document.createElement("p");
    // pAuthorEl.textContent = author;
    // divSub.appendChild(pAuthorEl);
    // let pDateEl = document.createElement("p");
    // pDateEl.textContent = `Date: ${day}-${month}-${year}`;
    // divSub.appendChild(pDateEl);
    // contener.appendChild(divSub);

    // let pDayEl=document.createElement("p");
    // let pMonthEl=document.createElement("p");
    // let pYearEl=document.createElement("p");

    save();
}

myForm.addEventListener("submit", render);

function save() {
    let data = JSON.stringify(articles);
    localStorage.setItem("articles", data);

}
function load() {
    let stringObj = localStorage.getItem("articles");
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        // new Article(author, title, content, subject, day, month, year);
        for (let i = 0; i < normalObj.length; i++) {
            new Article(normalObj[i].author,normalObj[i].title,normalObj[i].content,normalObj[i].subject,normalObj[i].day,normalObj[i].month,normalObj[i].year);
            articles[i].renderINI();

            
        }

    }
}
load();
// let codeing=new Article("abdullah","coding","anyre dfjg fdjgfd ","asdsadas dasd","10","09","2020")
// // codeing.genertaID();
// console.log(codeing);
// let Ai=new Article("abdullah","coding","anyre dfjg fdjgfd ","asdsadas dasd","10","09","2020")
// // Ai.genertaID();
// console.log(Ai);