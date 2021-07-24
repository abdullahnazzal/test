'use strict';
let productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let productname = [];


let h1El = document.getElementById("h1El");
let contenerEl = document.getElementById("contaner");
let imgLeft = document.getElementById("left");
let imgRight = document.getElementById("right");

let catsSrc = [];
let leftIndex = 0;
let rightIndex = 0;
let attempts = 0;
let maxAttempts = 5;
let voteTotel = [];
let viewTotel = [];
function Cats(img) {

    this.name = img.split(".")[0];
    this.img = 'img/' + img;
    this.view = 0
    this.vote = 0;
    productname.push(this.name);
    catsSrc.push(this)
    // }

}

function generationImg() {
    for (let i = 0; i < productImg.length; i++) {
        new Cats(productImg[i]);
    }
}
generationImg()


function randomImg() {
    leftIndex = Math.floor(Math.random() * productImg.length);
    rightIndex = Math.floor(Math.random() * productImg.length);
}
function render() {

    while (leftIndex === rightIndex) {
        randomImg();
    }
    imgLeft.setAttribute("src", catsSrc[leftIndex].img)
    imgRight.setAttribute("src", catsSrc[rightIndex].img)
    catsSrc[leftIndex].view++;
    catsSrc[rightIndex].view++;
    contenerEl.appendChild(imgLeft);
    contenerEl.appendChild(imgRight);
}
render();
imgLeft.addEventListener('click', handlClick);
imgRight.addEventListener('click', handlClick);
function handlClick(event) {
    event.preventDefault();

    attempts = attempts + 1;
    if (attempts <= maxAttempts) {
        let clickTarget = event.target.id;
        if (clickTarget === "left") {
            catsSrc[leftIndex].vote++;
            saveToLocalStorg();
        }
        else {
            catsSrc[rightIndex].vote++;
            saveToLocalStorg();
        }
        randomImg();
        render();

    } else {
        renderUl();
        imgLeft.removeEventListener('click', handlClick);
        imgRight.removeEventListener('click', handlClick);
    }
    // imgLeft.removeEventListener(); myChart
    // imgRight.removeEventListener();
}
function renderUl() {
    let ulEl = document.createElement("ul");
    for (let i = 0; i < catsSrc.length; i++) {
        let liEl = document.createElement("li");
        liEl.textContent = `${catsSrc[i].name} had ${catsSrc[i].vote} `;
        ulEl.appendChild(liEl);
        voteTotel.push(catsSrc[i].vote);
        viewTotel.push(catsSrc[i].view);

    }
    // getChart()
    contenerEl.appendChild(ulEl);

}
function getChart() {

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productname,
            datasets: [{
                label: '# of Votes',
                data: voteTotel,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            },
            {
                label: '# of view',
                data: viewTotel,
                backgroundColor: [

                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [

                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
randomImg();


// for (let i = 0; i < catsSrc.length; i++) {
//     console.log(catsSrc[i].name + "  " + catsSrc[i].vote);

// }
// console.log(catsSrc.length);
// console.log(leftIndex);
// console.log(rightIndex);


// console.log(catsSrc);
function saveToLocalStorg() {
    let data = JSON.stringify(catsSrc);
    localStorage.setItem("cats", data);

}
function load() {
    let stringObj = localStorage.getItem("cats");
    let normalObj = JSON.parse(stringObj);
    if (normalObj != null) {
        catsSrc = normalObj;
        renderUl();
    }
    // render();

}
load();
// contenerEl.textContent = "";