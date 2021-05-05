const contenedor = document.querySelector('.contenedor')
//Definir medidas
const highBoard = 300
const widthBoard = 570
const highBlock = 20
const widthBlock = 100

//Definir posicion de Usuario
const userInitialPosition = [230, 10]
let currentUserPosition = userInitialPosition
//Definir la posicion de la pelota
const ballStartingPosition = [270, 40]
let currentBallPosition = ballStartingPosition
//Defino movimiento de la pelota
let xBallDirection = 2
let yBallDirection = 2
let diameter = 20
//Defino timer
let timerID
//Definir clase block
class Block{
    constructor(ejeX, ejeY){
       this.bottomLeft = [ejeX, ejeY]
       this.bottomRigth = [ejeX + widthBlock, ejeY]
       this.topLeft = [ejeX, ejeY + highBlock]
       this.topRight = [ejeX + widthBoard, ejeY + highBlock]
        
    }
}
// Definir blocks que estaran
const blocks = [
    new Block(10, 250),
    new Block(120, 250),
    new Block(230, 250),
    new Block(340, 250),
    new Block(450, 250),
    new Block(10, 220),
    new Block(120, 220),
    new Block(230, 220),
    new Block(340, 220),
    new Block(450, 220),
    new Block(10, 190),
    new Block(120, 190),
    new Block(230, 190),
    new Block(340, 190),
    new Block(450, 190)  
]
//Funcion que añade blocks
function addBlocks(){
    for(let i = 0; i < blocks.length; i++ ){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        contenedor.appendChild(block)
    }
}
//Añadir bloques al juegp
addBlocks()
//Definir usuario
function drawUser(){
    user.style.left = currentUserPosition[0] + 'px'
    user.style.bottom = currentUserPosition[1] + 'px'
}
//Añadir user
const user = document.createElement('div')
user.classList.add('user')
contenedor.appendChild(user)
drawUser()
//Mover el usuario por el tablero
function moveUser(e){
   switch(e.key){
       case 'ArrowLeft':
           if(currentUserPosition[0] > 0){
               currentUserPosition[0] -= 10
               drawUser()
           }
           break
       case 'ArrowRight':
           if(currentUserPosition[0] < (widthBoard - widthBlock)){
              currentUserPosition[0] += 10
              drawUser()
           }
           break
   }
}
//Añadir evento para el documento de movimiento
document.addEventListener('keydown', moveUser)

//dibujar pelota
function drawBall(){
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
}
const ball = document.createElement('div')
ball.classList.add('ball')
contenedor.appendChild(ball)
drawBall()

function moveBall(){
    currentBallPosition[0] += xBallDirection
    currentBallPosition[1] += yBallDirection
    drawBall()
    checkCollisions()
    gameOver()
}

timerId = setInterval(moveBall, 20)

function checkCollisions(){
    //Si choca con los bloques
    for (let i = 0; i< blocks.length; i++){
        if(currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomRigth[0] &&
            ((currentBallPosition[1] + diameter) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1])
            ){
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                chainDirection()
            }
    }
    //Si choca con las paredes
    if(
        currentBallPosition[0] >= (widthBoard - diameter) ||
        currentBallPosition[1] >= (highBoard - diameter) ||
        currentBallPosition[0] <= 0 ||
        currentBallPosition[1] <= 0 
    ){
        chainDirection()

    }
    //para que choque con el user
    if((currentBallPosition[0] > currentUserPosition[0] && currentBallPosition[0] < currentUserPosition[0] + widthBoard)&&
    (currentBallPosition[1] > currentUserPosition[1] && currentBallPosition[1] < currentUserPosition[1] + highBoard)
    ){
        chainDirection()
    }

}

function gameOver(){
    if(currentBallPosition[1] <= 0){
        clearInterval(timerId)
       // score.innerHTML = 'Sorry you lost, reload again to play.'
        document.removeEventListener('keydown', moveUser)
    }
}

//Cambio de direccion
function chainDirection(){
    if(xBallDirection === 2 && yBallDirection === 2){
        yBallDirection =- 2
        return
    }
    if(xBallDirection === 2 && yBallDirection === -2){
        xBallDirection =- 2
        return
    }
    if(xBallDirection === -2 && yBallDirection === -2){
        yBallDirection = 2
        return
    }
    if(xBallDirection === -2 && yBallDirection === 2){
        xBallDirection = 2
        return
    }
}
 