'use strict';
let divContener = document.getElementById("contener");
let myForm = document.getElementById("myForm");
let students = [];
function Student(studentName, studentGrade, studentAge) {
    this.studentName = studentName;
    this.studentGrade = studentGrade;
    this.studentAge = studentAge;
    students.push(this);

}
Student.prototype.render = function () {
    let ulEl = document.createElement("ul");
    let liEl = document.createElement("li");
    liEl.textContent = `Student: ${this.studentName}, Grade: ${this.studentGrade}, Age: ${this.studentAge}`;
    ulEl.appendChild(liEl);
    divContener.appendChild(ulEl);
}
myForm.addEventListener("submit", renderStudent);
function renderStudent(event) {
    event.preventDefault();
    let studentName = event.target.studentName.value;
    let studentGrade = event.target.studentGrade.value;
    let studentAge = event.target.studentAge.value;

    let newStudent = new Student(studentName, studentGrade, studentAge);
    newStudent.render();
    save()
}
function save() {
    let data = JSON.stringify(students);
    localStorage.setItem("std", data);
}
function load() {
    let stringObj = localStorage.getItem("std");
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        for (let i = 0; i < normalObj.length; i++) {
        new Student(normalObj[i].studentName, normalObj[i].studentGrade, normalObj[i].studentAge);
            students[i].render();
        }
        

    }
}
load()