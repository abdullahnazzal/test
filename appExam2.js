

//golbel Vaible
let myForm = document.getElementById("myForm");
let tableContener = document.getElementById("tableContener");
let priceConterner=document.getElementById("price");
let arrayOfTabelContect = ["author", "title", "content", "subject", "Date", "Likes", "Price","Remove"]
let arrayOfArticle = [];
let previousID = 1;
//Functions and contacter
function Article(author, title, content, subject, day, month, year) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.subject = subject;
    this.day = day;
    this.month = month;
    this.year = year;
    this.id = previousID;
    this.likes = 0;
    this.price = 0;
    arrayOfArticle.push(this);

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
    newArticle.increseID();
    newArticle.randomLikes();
    newArticle.randomPrice();
    newArticle.renderContent();


    localStorage.setItem("Article", JSON.stringify(arrayOfArticle))
}
function randerTableHeader() {
    let tabelHeader = document.createElement('th');
    let td;
    for (let i = 0; i < arrayOfTabelContect.length; i++) {
        td = document.createElement('td');
        td.textContent = arrayOfTabelContect[i];
        tabelHeader.appendChild(td);

    }
    tableContener.appendChild(tabelHeader);

}
Article.prototype.renderContent = function () {
    let tabelBody = document.createElement('tr');
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
    let likeEl = document.createElement('td');
    likeEl.textContent = this.likes;
    let priceEl = document.createElement('td');
    priceEl.textContent = this.price;
    let removeEl = document.createElement('td');
    removeEl.textContent = "X";
    let aForRemoveEl=document.createElement('a')
    aForRemoveEl.setAttribute("id","aClick");
    aForRemoveEl.setAttribute("href","");
    aForRemoveEl.appendChild(removeEl);
    // let handelRamove=document.getElementById("aClick");
    aForRemoveEl.addEventListener('click',removeFun);
    let pricess=calPrice();
    priceConterner.textContent=pricess;

    tabelBody.appendChild(authorEl);
    tabelBody.appendChild(titleEl);
    tabelBody.appendChild(contentEl);
    tabelBody.appendChild(subjectEl);
    tabelBody.appendChild(DateEl);
    tabelBody.appendChild(likeEl);
    tabelBody.appendChild(priceEl);
    // tabelBody.appendChild(priceConterner);
    tabelBody.appendChild(aForRemoveEl);
    // tabelBody.appendChild(monthEl);
    // tabelBody.appendChild(yearEl);

    tableContener.appendChild(tabelBody);
}
Article.prototype.increseID = function () {
    previousID = previousID + 1;
    // this.id=this.id+1;

}
Article.prototype.randomLikes = function () {
    let min = 1;
    let max = 500;
    this.likes = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    // this.id=this.id+1;

}
Article.prototype.randomPrice = function () {
    let min = 1;
    let max = 500;
    this.price = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    // this.id=this.id+1;

}
function renderAtAll() {
    // tableContener.textContent="";
    randerTableHeader();
    for (let i = 0; i < arrayOfArticle.length; i++) {
        let tabelBody = document.createElement('tr');
        let authorEl = document.createElement('td');
        authorEl.textContent = arrayOfArticle[i].author;
        let titleEl = document.createElement('td');
        titleEl.textContent = arrayOfArticle[i].title;
        let contentEl = document.createElement('td');
        contentEl.textContent = arrayOfArticle[i].content;
        let subjectEl = document.createElement('td');
        subjectEl.textContent = arrayOfArticle[i].subject;
        let DateEl = document.createElement('td');
        DateEl.textContent = `${arrayOfArticle[i].day}-${arrayOfArticle[i].month}-${arrayOfArticle[i].year}`;
        let likeEl = document.createElement('td');
        likeEl.textContent = arrayOfArticle[i].likes;

        let priceEl = document.createElement('td');
        priceEl.textContent = arrayOfArticle[i].price;

        let pricess=calPrice();
        priceConterner.textContent=pricess;

        tabelBody.appendChild(authorEl);
        tabelBody.appendChild(titleEl);
        tabelBody.appendChild(contentEl);
        tabelBody.appendChild(subjectEl);
        tabelBody.appendChild(DateEl);
        tabelBody.appendChild(likeEl);
        tabelBody.appendChild(priceEl);
        tabelBody.appendChild(priceConterner);
        // tabelBody.appendChild(monthEl);
        // tabelBody.appendChild(yearEl);

        tableContener.appendChild(tabelBody);

    }
}
function removeFun(event) {
    event.preventDefault();

    console.log("+++++++++++++");
}
function CheckLocalStorge() {
    if (localStorage.getItem("Article")) {
        arrayOfArticle = JSON.parse(localStorage.getItem("Article"));
        renderAtAll();

    }

}
// CheckLocalStorge();
function load() {
    let stringObj = localStorage.getItem("Article");
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        // new Article(author, title, content, subject, day, month, year);

        // for (let i = 0; i < normalObj.length; i++) {
        //     new Article(normalObj[i].author,normalObj[i].title,normalObj[i].content,normalObj[i].subject,normalObj[i].day,normalObj[i].month,normalObj[i].year);
        //     arrayOfArticle[i].renderContent();


        // }
        arrayOfArticle = normalObj;
        renderAtAll();
    }
}
function calPrice() {
    let totle=0;
    for (let index = 0; index < arrayOfArticle.length; index++) {
        
        totle=totle+ arrayOfArticle[index].price;
    }
    return totle;
    
}
load();

//call function and event lisner
randerTableHeader();
myForm.addEventListener("submit", handelSubmit)

