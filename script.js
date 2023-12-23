const board = document.getElementById('game-board');


//GAme Variable
let gridSize = 20;
let serpent = [{x:10, y:10}];
let apple = generateApple();
let gameStarted = false;
let direction = 'right'; 
let gameSpeedDelay = 200;
let gameInterval;

//draw apple and serpent
function draw(){
    board.innerHTML = '';
    drawSerpent();
    drawApple();
}


draw();




function drawSerpent(){
    serpent.forEach(segment=>{
        const serpentElem = createGameElement('div','serpent');
        getPosition(serpentElem,segment);
        board.appendChild(serpentElem);
    });
}

function createGameElement(tag,name){
    const element = document.createElement(tag);
    element.className = name;
  
    return element;

}


function getPosition(elem,position){
    elem.style.gridColumn = position.x;
    elem.style.gridRow = position.y;

}

function drawApple(){
    const appleElem = createGameElement('div','apple');
        getPosition(appleElem,apple);
        board.appendChild(appleElem);
}

function generateApple(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    
    return {x,y}
}

function movement(){
    const head = {...serpent[0]};
;
    switch(direction){
        case 'left':
            head.x--
            break;
        case 'right':
            head.x++
            break;
        case 'up':
            head.y--
            break;
        case 'down':
            head.y++
            break;
    }

    serpent.unshift(head);

    if(head.x === apple.x && head.y === apple.y){
        apple = generateApple();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(()=>{
            movement();
            collisions();
            draw();

        }, gameSpeedDelay);
    }else{
        serpent.pop();
    }

}

document.addEventListener('keydown',handleKeyPressed);


function increaseSpeed(){
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    }else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

function handleKeyPressed(event){
    if(!gameStarted && event.code === 'Space' || !gameStarted && event.key === ' '){
        startGame();

    }


    switch(event.key){
        case 'ArrowRight':
            direction = 'right'
            break;
        case 'ArrowLeft':
            direction = 'left'
            break;
        case 'ArrowDown':
            direction = 'down'
            break;

        case 'ArrowUp':
            direction = 'up'
            break;
    }
}

function startGame(){
    gameStarted = true;

    gameInterval = setInterval(()=>{
        movement();
        draw();

    }, gameSpeedDelay);

}

function collisions(){
    const head = serpent[0];
    if(head.x < 1 || head.y < 1 ||head.x > 20 || head.y > 20){
        resetGame();
    }

    for(let i = 1; i < serpent.length-1; i++ ){
        if(head.x === serpent[i].x && head.y === serpent[i].y){
            resetGame();
        }
    }
}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
}

function resetGame(){
    stopGame();
    serpent = [{x:10, y: 10}];
    gameSpeedDelay = 200;
    apple = generateApple();
    direction = 'right'; 
       
}