'use strict';
//////////////////////
//Global variables ///
/////////////////////
let myForm = document.getElementById("myForm");
let contener = document.getElementById("contener");
let tableContener = document.getElementById("tableContener");
let totalPriceEl = document.getElementById("price");
let arrayOfTabelContect = ["author", "title", "content", "subject", "Date", "Likes", "Price", "Remove"];
firstRender();
let previous = 1;
let arrayOfarticles = [];
// let totalPrice = 0;

////////////////////////////
//Function AND Contrater////
////////////////////////////
function Article(author, title, content, subject, day, month, year) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.subject = subject;
    this.day = day;
    this.month = month;
    this.year = year;
    this.id = previous;
    this.price = randomPrice();
    this.likes = randomLikes();
    // totalPrice = totalPrice + this.price;
    arrayOfarticles.push(this);

}
Article.prototype.increasID = function () {
    previous++;
}
function totelFun() {
    let totel=0;
    for (let i = 0; i < arrayOfarticles.length; i++) {
        totel+=arrayOfarticles[i].price;
        
    }
    return totel;
}
function randomLikes() {
    let min = 1;
    let max = 500;
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function randomPrice() {
    let min = 50;
    let max = 200;
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function handelSubmit(event) {
    event.preventDefault();
    let author = event.target.author.value;
    let title = event.target.title.value;
    let content = event.target.content.value;
    let subject = event.target.subject.value;
    let day = event.target.day.value;
    let month = event.target.month.value;
    let year = event.target.year.value;
    let newArticle = new Article(author, title, content, subject, day, month, year);
    newArticle.contextRender();
    newArticle.increasID();
    // totalPrice = totalPrice + newArticle.price;
    // contextRender();
    localStorage.setItem("Article", JSON.stringify(arrayOfarticles));
}
function firstRender() {

    //  tableHeader = document.createElement('th');
    //  tableContext = document.createElement('tr');
    let tableHeader = document.createElement('th');

    // tableHeader.textContent = "";
    // tableContext.textContent = "";


    let td;
    for (let i = 0; i < arrayOfTabelContect.length; i++) {
        td = document.createElement('td');
        td.textContent = arrayOfTabelContect[i];
        tableHeader.appendChild(td);
    }

    contener.appendChild(tableHeader);

}

Article.prototype.contextRender = function () {
    // firstRender();
    let tableContext = document.createElement('tr');
    tableContext.textContent = "";



    let authorEl = document.createElement('td');
    authorEl.textContent = this.author;
    let titleEl = document.createElement('td');
    titleEl.textContent = this.title;
    let contentEl = document.createElement('td');
    contentEl.textContent = this.content;
    let subjectEl = document.createElement('td');
    subjectEl.textContent = this.subject;
    let DateEl = document.createElement('td');
    DateEl.textContent = `${this.day}-${this.month}-${this.year}`;

    let likesEl = document.createElement('td');
    likesEl.textContent = this.likes;

    let removeEl = document.createElement('td');
    let removeAEl = document.createElement('a');
    removeAEl.setAttribute("href", "");
    removeAEl.setAttribute("id", arrayOfarticles.indexOf(this));
    removeAEl.textContent = "X";
    removeAEl.addEventListener('click', removeRow)
    removeEl.appendChild(removeAEl);




    tableContext.appendChild(authorEl);
    tableContext.appendChild(titleEl);
    tableContext.appendChild(contentEl);
    tableContext.appendChild(subjectEl);
    tableContext.appendChild(DateEl);
    tableContext.appendChild(likesEl);
    tableContext.appendChild(removeEl);



    contener.appendChild(tableContext);
    totalPriceEl.textContent = totelFun();
    contener.appendChild(totalPriceEl);

}
function removeRow(event) {
    event.preventDefault();
    alert("++++");
    // let index=arrayOfarticles[].id;
    let index = event.target.id;
    arrayOfarticles.splice(index, 1);
    localStorage.clear();
    localStorage.setItem("Article", JSON.stringify(arrayOfarticles));
    arrayOfarticles=[];
    
    LoadFormLocalStorage();
    console.log("-----------" + index);
    // totalPrice = totalPrice - arrayOfarticles[index].price;




    // tableContener.innerHTML="";

    contener.textContent = "";
    firstRender();
    //tableContener.textContent="";
    LoadFormLocalStorage();
    // let stringObj = localStorage.getItem("Article");
    // let normalObj = JSON.parse(stringObj);
    // if (normalObj !== null) {
    //     arrayOfarticles = normalObj;
    //     for (let i = 0; i < arrayOfarticles.length; i++) {
    //         totalPrice=0;
    //         totalPrice=totalPrice+arrayOfarticles[i].price;

    //     }
    // }


    // tableContener.textContent="";
    // LoadFormLocalStorage();
    // cart.splice(event.target.id, 1);
    // cartIndex.splice(event.target.id, 1);

}
function renderAfterReload() {
    // firstRender();
    for (let i = 0; i < arrayOfarticles.length; i++) {
        let tableContext = document.createElement('tr');
        tableContext.textContent = "";



        let authorEl = document.createElement('td');
        authorEl.textContent = arrayOfarticles[i].author;
        let titleEl = document.createElement('td');
        titleEl.textContent = arrayOfarticles[i].title;
        let contentEl = document.createElement('td');
        contentEl.textContent = arrayOfarticles[i].content;
        let subjectEl = document.createElement('td');
        subjectEl.textContent = arrayOfarticles[i].subject;
        let DateEl = document.createElement('td');
        DateEl.textContent = `${arrayOfarticles[i].day}-${arrayOfarticles[i].month}-${arrayOfarticles[i].year}`;
        let likesEl = document.createElement('td');
        likesEl.textContent = arrayOfarticles[i].likes;


        let removeEl = document.createElement('td');
        let removeAEl = document.createElement('a');
        removeAEl.setAttribute("href", "");
        removeAEl.textContent = "X";
        removeAEl.addEventListener('click', removeRow)
        removeEl.appendChild(removeAEl);




        tableContext.appendChild(authorEl);
        tableContext.appendChild(titleEl);
        tableContext.appendChild(contentEl);
        tableContext.appendChild(subjectEl);
        tableContext.appendChild(DateEl);
        tableContext.appendChild(likesEl);
        tableContext.appendChild(removeEl);



        contener.appendChild(tableContext);
        totalPriceEl.textContent = totelFun();
        contener.appendChild(totalPriceEl);

    }


}
function LoadFormLocalStorage() {
    let stringObj = localStorage.getItem("Article");
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        arrayOfarticles = normalObj;
        renderAfterReload();
        // firstRender()

    }

}

///////////////////////////////////////////
/////Call Function AND EventListener///////
//////////////////////////////////////////
myForm.addEventListener("submit", handelSubmit);

// firstRender();
LoadFormLocalStorage();
