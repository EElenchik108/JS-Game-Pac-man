"use strict";
let field = document.querySelector('.playArea');
let heightField = field.getBoundingClientRect().height;		
let widthField = field.getBoundingClientRect().width;		
let yField = field.getBoundingClientRect().y;		
let xField = field.getBoundingClientRect().x;		
let pic = document.getElementsByClassName('pic')[0];
let fruitsImage = ["url(images/ameixa.png)", "url(images/apple1.png)","url(images/avokado.png)","url(images/banana.png)","url(images/blackberry.png)","url(images/cherry.png)","url(images/figs.png)","url(images/grape.png)","url(images/kiwi.png)","url(images/lemon1.png)","url(images/orange1.png)","url(images/peach.png)","url(images/plum1.png)","url(images/plum2.png)","url(images/pomegranate6.png)","url(images/raspberries.png)","url(images/raspberry.png)","url(images/strawberry.png)","url(images/strawberry1.png)","url(images/watermelon.png)"];		
let maxRight = xField+widthField;
let maxBottom = yField+heightField;
let body = document.body;
let clock = document.querySelector('#clock>span');
let amount = document.querySelector('#amount>span');		
let x=xField, y=yField;
let int;
let intR;
let modalScore = document.getElementById('modalScore');
let userName = document.querySelector('input[name="userName"]');
let once = false;
let once2 = false;
let usersArray = localStorage.getItem('results')?JSON.parse(localStorage.getItem('results')):[];
let table = document.querySelector('tbody');
let close = document.querySelector(".btn-close");
let fences = document.querySelectorAll(".fency");
let clearRows = document.getElementById('clear');
let count = 30;
let score = 0;
let timeGame = 50;
let interval;		
let countFruits;
let buttonLose = document.querySelector('.buttonLose');
let won = document.getElementById('won');

pic.style.left = x+"px";
pic.style.top = y+"px";
pic.style.transform = 'rotate(0deg)';		

for (let i=0; i<usersArray.length; i++){
    table.innerHTML += '<tr><td>'+(i+1)+'</td><td>'+usersArray[i].name+'</td><td>'+usersArray[i].score+'</td></tr>';			
}

function timer(){
    timeGame-=1;
    clock.innerHTML = timeGame;			
    if(timeGame==0) {
        clearInterval(interval);
        clearInterval(countFruits);
        moveStop();
        buttonLose.click();
        deleteFruits();				
        // body.removeEventListener('keydown', listener);
    }
}		

function createFruit(){
    for (let i=0; i<30; i++){
        let fruit =  document.createElement('div');
        fruit.style.backgroundImage = fruitsImage[Math.floor(Math.random() * fruitsImage.length)];
        fruit.classList = 'fruit';
        field.prepend(fruit);
        fruit.style.left = Math.floor(Math.random()*(widthField-fruit.getBoundingClientRect().width))+'px';
        fruit.style.top = Math.floor(Math.random()*(heightField-fruit.getBoundingClientRect().height))+'px';									
    }
}	

function deleteFruits(){
    let fruits = document.querySelectorAll('.fruit');
    for (let i=0; i<fruits.length; i++){					
            fruits[i].remove();
    }
}

createFruit();

function moveRight(){			
    x+=1;
    pic.style.left = x+'px';
    pic.style.transform = 'rotate(0deg)';
    if(maxRight<=(pic.getBoundingClientRect().x+pic.getBoundingClientRect().width)){
        moveStop();
        pic.style.left = (maxRight-pic.getBoundingClientRect().width)+'px';
    }
    let fruits = document.querySelectorAll('.fruit');
    for (let i=0; i<fruits.length; i++){				
        if((pic.getBoundingClientRect().x+pic.getBoundingClientRect().width)==(fruits[i].getBoundingClientRect().x)&&(pic.getBoundingClientRect().y+60)>fruits[i].getBoundingClientRect().y&&pic.getBoundingClientRect().y<(fruits[i].getBoundingClientRect().y+fruits[i].getBoundingClientRect().height)){
            fruits[i].remove();			
        }
    }
    
    for (let i=0; i<fences.length; i++){	

        if(fences[i].getBoundingClientRect().x==(pic.getBoundingClientRect().x+pic.getBoundingClientRect().width) && (pic.getBoundingClientRect().y+pic.getBoundingClientRect().height)>fences[i].getBoundingClientRect().y && pic.getBoundingClientRect().y<(fences[i].getBoundingClientRect().y+fences[i].getBoundingClientRect().height)) {
            moveStop();
            pic.style.left = (fences[i].getBoundingClientRect().x-pic.getBoundingClientRect().width)+'px';
            x-=1;
        }
    }
}
        
function moveStop(){
    clearInterval(intR);	
}

function moveLeft(){
    x-=1;
    pic.style.left = x+'px';
    pic.style.transform = 'scale(-1, 1)';
    if(pic.getBoundingClientRect().x<=xField) {
        moveStop();
        pic.style.left = xField+'px';
    }
    let fruits = document.querySelectorAll('.fruit');
    for (let i=0; i<fruits.length; i++){				
        if(pic.getBoundingClientRect().x==(fruits[i].getBoundingClientRect().x+fruits[i].getBoundingClientRect().width)&&(pic.getBoundingClientRect().y+pic.getBoundingClientRect().height)>fruits[i].getBoundingClientRect().y&&pic.getBoundingClientRect().y<(fruits[i].getBoundingClientRect().y+fruits[i].getBoundingClientRect().height)){
            fruits[i].remove();					
        }	
    }
    for (let i=0; i<fences.length; i++){
        if((fences[i].getBoundingClientRect().x+fences[i].getBoundingClientRect().width)==pic.getBoundingClientRect().x && (pic.getBoundingClientRect().y+pic.getBoundingClientRect().height)>fences[i].getBoundingClientRect().y && pic.getBoundingClientRect().y<(fences[i].getBoundingClientRect().y+fences[i].getBoundingClientRect().height)) {
            moveStop();
            pic.style.left = (fences[i].getBoundingClientRect().x+fences[i].getBoundingClientRect().width)+'px';
            x+=1;
        }
    }
}

function moveTop(){			
    y-=1;
    pic.style.top = y+'px';
    pic.style.transform = 'rotate(-90deg)';
    
    if(pic.getBoundingClientRect().y<=yField) {
        moveStop();
        pic.style.top = yField+'px';	
    }

    for (let i=0; i<fences.length; i++){
        let maxTop = fences[i].getBoundingClientRect().y+fences[i].getBoundingClientRect().height;
        let maxLeftPic = pic.getBoundingClientRect().x+pic.getBoundingClientRect().width;
        let maxLeftFency = fences[i].getBoundingClientRect().x+fences[i].getBoundingClientRect().width;			

        if(pic.getBoundingClientRect().y==maxTop && maxLeftPic>fences[i].getBoundingClientRect().x && pic.getBoundingClientRect().x<maxLeftFency) {
            moveStop();
            pic.style.top = maxTop+'px';
            y+=1;
        }
    }

    let fruits = document.querySelectorAll('.fruit');
    for (let i=0; i<fruits.length; i++){				
        if(pic.getBoundingClientRect().y==(fruits[i].getBoundingClientRect().y+fruits[i].getBoundingClientRect().height)&&(pic.getBoundingClientRect().x+pic.getBoundingClientRect().width)>fruits[i].getBoundingClientRect().x&&pic.getBoundingClientRect().x<(fruits[i].getBoundingClientRect().x+fruits[i].getBoundingClientRect().width)){
            fruits[i].remove();					
        }	
    }
}

function moveBottom(){
    y+=1;
    pic.style.top = y+'px';
    pic.style.transform = 'rotate(90deg)';	
    if(maxBottom-1<=(pic.getBoundingClientRect().y+60)) {
        moveStop();
        pic.style.top = (maxBottom-61)+'px';
    }
    let fruits = document.querySelectorAll('.fruit');
    for (let i=0; i<fruits.length; i++){				
        if((pic.getBoundingClientRect().y+pic.getBoundingClientRect().height)==(fruits[i].getBoundingClientRect().y)&&(pic.getBoundingClientRect().x+pic.getBoundingClientRect().width)>fruits[i].getBoundingClientRect().x&&pic.getBoundingClientRect().x<(fruits[i].getBoundingClientRect().x+fruits[i].getBoundingClientRect().width)){
            fruits[i].remove();					
        }	
    }

    for (let i=0; i<fences.length; i++){
        let maxLeftPic = pic.getBoundingClientRect().x+pic.getBoundingClientRect().width;
        let maxTop = pic.getBoundingClientRect().y+pic.getBoundingClientRect().height;
        let maxLeftFency = fences[i].getBoundingClientRect().x+fences[i].getBoundingClientRect().width;			

        if(fences[i].getBoundingClientRect().y==maxTop && maxLeftPic>fences[i].getBoundingClientRect().x && pic.getBoundingClientRect().x<maxLeftFency) {
            moveStop();
            pic.style.top = (fences[i].getBoundingClientRect().y-pic.getBoundingClientRect().height)+'px';
            y-=1;
        }
    }	
}

function moveClear(){
    x=xField;
    y=yField;
    pic.style.top = yField+'px';
    pic.style.left = xField+'px';		
}

function onceInclude(){
    if(!once){				
            interval =	setInterval(timer, 1000);
            countFruits = setInterval(getCount, 300);
            once = true;				
        }
}

let listener = function (event) {
    if(event.keyCode==38) {				
        moveStop();
        intR=setInterval(moveTop, 10);
        onceInclude();
    }				
    else if(event.keyCode==39) {
        moveStop();
        intR=setInterval(moveRight, 10);				
        onceInclude();				
        }
    else if(event.keyCode==37) {
        moveStop();
        intR=setInterval(moveLeft, 10);	
        onceInclude();
        }
    else if(event.keyCode==40) {
        moveStop();
        intR=setInterval(moveBottom, 10);
        onceInclude();	
        }
    else if(event.keyCode==32) {
        moveStop();
        clearInterval(interval);
        once = false;
    }	
        
    else if(event.keyCode==46) {
        moveStop();
        moveClear();
        deleteFruits();
        createFruit();
        clearInterval(interval);
        timeGame = 50;
        once = false;
        once2 = false;
    }			
};

body.addEventListener('keydown', listener);		

let getCount = function() {
    let fruits = document.querySelectorAll('.fruit');
    amount.innerHTML = fruits.length;
    if(fruits.length==0&&timeGame>0){				
        if(!once2) {
            clearInterval(countFruits);
            won.click();
            score = timeGame*5;
            modalScore.innerHTML = score;
            once2 = true;
        }				
    }
}

butUser.addEventListener('click', (e)=>{
    clearInterval(interval);	
    e.preventDefault();
    let Obj = {};	
    Obj.name = htmlEntities(userName.value);
    Obj.score = score;
    usersArray.push(Obj);		
    localStorage.setItem('results', JSON.stringify(usersArray));
    document.querySelector('.btn-close').click();			
   
    table.innerHTML += '<tr><td>'+usersArray.length+'</td><td>'+Obj.name+'</td><td>'+Obj.score+'</td></tr>';				
});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

clearRows.addEventListener('click', ()=>{
    localStorage.clear();
    usersArray = [];
    let rows = document.querySelectorAll('tbody tr');
    for (let j=0; j<rows.length; j++) {
    rows[j].remove();
    }
})
