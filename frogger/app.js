const timeLeftDisplay= document.querySelector('#time-left')
const resultDisplay= document.querySelector('#result')
const startPauseButton=document.querySelector('#Start-pause-button')
const squares= document.querySelectorAll('.grid div')
const logsleft=document.querySelectorAll('.log-left')
const logsright=document.querySelectorAll('.log-right')
const carsleft=document.querySelectorAll('.car-left')
const carsright=document.querySelectorAll('.car-right')

console.log(squares)
let currentIndex=76
const width=9
let timerId
let outcomeTimerId
let currentTime=20

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')


    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % width !==0) currentIndex -=1
            break
        case 'ArrowRight' :
            if (currentIndex % width < width -1) currentIndex +=1
            break
        case 'ArrowUp' :
            if (currentIndex - width >=0) currentIndex-=width
            break
        case 'ArrowDown' :
            if (currentIndex+ width <width * width)currentIndex +=width    
            break    
    }

    squares[currentIndex].classList.add('frog')
}

function autoMoveElements(){
    currentTime--
    timeLeftDisplay.textContent=currentTime
    logsleft.forEach(logLeft=>moveLogLeft(logLeft))
    logsright.forEach(logRight=>moveLogRight(logRight))
    carsleft.forEach(carLeft =>moveCarLeft(carLeft))
    carsright.forEach(carRight => moveCarRight(carRight))
   
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft){
    switch(true) {
        case logLeft.classList.contains('L1'):
             logLeft.classList.remove('L1')
            logLeft.classList.add('L2')
            break
        case logLeft.classList.contains('L2'):
            logLeft.classList.remove('L2')
            logLeft.classList.add('L3')
            break
        case logLeft.classList.contains('L3'):
            logLeft.classList.remove('L3')
            logLeft.classList.add('L4')
            break
        case logLeft.classList.contains('L4'):
            logLeft.classList.remove('L4')
            logLeft.classList.add('L5')
            break
        case logLeft.classList.contains('L5'):
            logLeft.classList.remove('L5')
            logLeft.classList.add('L1')
            break
    }
}


function moveLogRight(logRight){
    switch(true) {
        case logRight.classList.contains('L1'):
             logRight.classList.remove('L1')
            logRight.classList.add('L5')
            break
        case logRight.classList.contains('L2'):
            logRight.classList.remove('L2')
            logRight.classList.add('L1')
            break
        case logRight.classList.contains('L3'):
            logRight.classList.remove('L3')
            logRight.classList.add('L2')
            break
        case logRight.classList.contains('L4'):
            logRight.classList.remove('L4')
            logRight.classList.add('L3')
            break
        case logRight.classList.contains('L5'):
            logRight.classList.remove('L5')
            logRight.classList.add('L4')
            break
    }
}

function moveCarLeft(carLeft){
    switch(true) {
        case carLeft.classList.contains('c1'):
             carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight){
    switch(true) {
        case carRight.classList.contains('c1'):
             carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}


function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('L4') ||
        squares[currentIndex].classList.contains('L5') ||
        currentTime<=0
    ) {
        resultDisplay.textContent='You lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    } 
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent='You won!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        var div2=document.getElementById('grid2')
        div2.style.visibility='block';
        $(selector).hide('grid')


    }
}




startPauseButton.addEventListener('click',() => { 
    if(timerId) {  
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId=null
        timerId=null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId=setInterval(autoMoveElements,1000)
        outcomeTimerId=setInterval(checkOutComes,50)
        document.addEventListener('keyup', moveFrog)
    }
})

