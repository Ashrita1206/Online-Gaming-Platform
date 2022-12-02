document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')
    ;

    

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 3
    let isGameOver = false
    let gap = 430
    let score_val = document.querySelector('.score_val');
    let score_title = document.querySelector('.score_title');


    const FLAP = new Audio();
    FLAP.src = "audio/sfx_flap.wav";

    const HIT = new Audio();
    HIT.src = "audio/sfx_hit.wav";

    const SWOOSHING = new Audio();
    SWOOSHING.src = "audio/sfx_swooshing.wav";

    const DIE = new Audio();
    DIE.src = "audio/sfx_die.wav";


    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
       
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
        FLAP.play();
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        
    }
    document.addEventListener('keyup', jump)
    /*if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
        score_val.innerHTML =+ score_val.innerHTML + 1;
        sound_point.play();
    }
    element.style.left = pipe_sprite_props.left - move_speed + 'px';*/

    

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
           
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
           
            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
               
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                    
                    HIT.play();
                gameOver()
                SWOOSHING.play();
               
                clearInterval(timerId)
            }
            
        }
        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()
    if(moveObstacle >generateObstacle)

    {
         score_val.innerHTML =+ score_val.innerHTML + 1;
     }
    function gameOver() {
        clearInterval(gameTimerId)
        
        isGameOver = true
        document.removeEventListener('keyup', jump)
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
        DIE.play();
        location.href="gameOver.html";
    }
   
    

})
