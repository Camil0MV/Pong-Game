document.addEventListener('DOMContentLoaded', function () {
    const mainMenu = document.getElementById('main-menu');

    const onePlayerButton = document.getElementById('one-player-button');
    const backBtn1 = document.getElementById('back-btn-1');
    const onePlayerScreen = document.getElementById('one-player-screen');

    const twoPlayerButton = document.getElementById('two-players-button');
    const backBtn2 = document.getElementById('back-btn-2');
    const twoPlayersScreen = document.getElementById('two-players-screen');

    onePlayerButton.addEventListener('click', function () {
        mainMenu.style.display = 'none';
        onePlayerScreen.classList.remove('hidden');

        const onePlayerCanvas = document.getElementById("one-player-canvas");
        const ctx = onePlayerCanvas.getContext("2d");
        const width = onePlayerCanvas.clientWidth;
        const height = onePlayerCanvas.clientHeight;

        const playerPad1 = new PlayerPad(691, 188, 10, 70, "#ffffff")
        playerPad1.draw(ctx);

        const computerPad = new ComputerPad(0, 188, 10, 70, "#ffffff")
        computerPad.draw(ctx);

        const ball = new Ball(6, width / 2, height / 2, "#ffffff");
        ball.draw(ctx);

        const playBtn1 = document.getElementById("play-btn-1");
        const pauseBtn1 = document.getElementById("pause-btn-1");

        let playerOneScore1 = 0;
        let computerScore = 0;

        let gamePaused = false;
        let requestId;

        function drawDivider(ctx) {
            ctx.beginPath();
            ctx.rect(width / 2, 0, 3, height);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
        }

        drawDivider(ctx)

        function checkScore() {
            checkPlayer1Score1();
            checkComputerScore();
            checkGameOver()
        }

        function checkPlayer1Score1() {
            if (ball.xCenter > width) {
                playerOneScore1++;
                ball.vx *= -1;
                ball.reset();
            }
        }
        
        function checkComputerScore() {
            if (ball.xCenter < 0) {
                computerScore++;
                ball.vx *= -1;
                ball.reset();
            }
        }

        function checkGameOver() {
            if (playerOneScore1 >= 5 || computerScore >= 5) {
                playerOneScore1 = 0;
                computerScore = 0;
                updateScores()
                gamePaused = true;
                cancelAnimationFrame(requestId);
                alert("Game Over");
            }
        }

        function updateScores() {
            const playerOneScore1Element = document.getElementById('player-one-score-1');
            const computerScoreElement = document.getElementById('computer-score');
            playerOneScore1Element.textContent = playerOneScore1;
            computerScoreElement.textContent = computerScore;
        }

        const keysPressed = {};

        document.addEventListener('keydown', function(e) {
            keysPressed[e.key] = true;
            move();
        });

        document.addEventListener('keyup', function(e) {
            keysPressed[e.key] = false;
            move();
        });

        function move() {
            if (keysPressed["ArrowUp"]) {
                playerPad1.y -= playerPad1.vy;

                if (playerPad1.y < 0) {
                    playerPad1.y = 0;
                }
            }

            if (keysPressed["ArrowDown"]) {
            playerPad1.y += playerPad1.vy;

                if (playerPad1.y + 70 > height) {
                    playerPad1.y = height - 70;
                }
            }

            ctx.clearRect(0, 0, width, height);
            drawDivider(ctx);
            ball.draw(ctx);
            playerPad1.draw(ctx);
            computerPad.draw(ctx);
        }

        function gameLoop() {
            if (!gamePaused) {
                ctx.clearRect(0, 0, width, height);

                drawDivider(ctx);

                ball.move();
                ball.bounceOnePlayerMode(onePlayerCanvas, playerPad1, computerPad);
                checkScore();
                updateScores();
                computerPad.updateComputerPad(ball, onePlayerCanvas)

                ball.draw(ctx);
                playerPad1.draw(ctx);
                computerPad.draw(ctx);
                
                requestId = requestAnimationFrame(gameLoop);
            }
        }

        playBtn1.addEventListener('click', function () {
            gamePaused = false;
            gameLoop();
        });

        pauseBtn1.addEventListener('click', function () {
            gamePaused = true;
            cancelAnimationFrame(requestId);
        });
    });

    backBtn1.addEventListener('click', function () {
        const onePlayerCanvas = document.getElementById("one-player-canvas");
        const ctx = onePlayerCanvas.getContext("2d");
        const width = onePlayerCanvas.clientWidth;
        const height = onePlayerCanvas.clientHeight;

        let playerOneScore1 = 0;
        let computerScore = 0;

        function updateScores() {
            const playerOneScore2Element = document.getElementById('player-one-score-1');
            const computerScoreElement = document.getElementById('computer-score');
            playerOneScore2Element.textContent = playerOneScore1;
            computerScoreElement.textContent = computerScore;
        }

        updateScores();

        ctx.clearRect(0, 0, width, height);

        mainMenu.style.display = 'flex';
        onePlayerScreen.classList.add('hidden');
    });

    twoPlayerButton.addEventListener('click', function () {
        mainMenu.style.display = 'none';
        twoPlayersScreen.classList.remove('hidden');

        const twoPlayersCanvas = document.getElementById("two-players-canvas");
        const ctx = twoPlayersCanvas.getContext("2d");
        const width = twoPlayersCanvas.clientWidth;
        const height = twoPlayersCanvas.clientHeight;

        const playerPad1 = new PlayerPad(691, 188, 10, 70, "#ffffff")
        playerPad1.draw(ctx);

        const playerPad2 = new PlayerPad(0, 188, 10, 70, "#ffffff")
        playerPad2.draw(ctx);

        const ball = new Ball(6, width / 2, height / 2, "#ffffff");
        ball.draw(ctx);

        const playBtn2 = document.getElementById("play-btn-2");
        const pauseBtn2 = document.getElementById("pause-btn-2");

        let playerOneScore2 = 0;
        let playerTwoScore = 0;

        let gamePaused = false;
        let requestId;

        function drawDivider(ctx) {
            ctx.beginPath();
            ctx.rect(width / 2, 0, 3, 447);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
        }

        drawDivider(ctx)

        function checkScore () {
            checkPlayer1Score2();
            checkPlayer2Score();
            checkGameOver();
        }

        function checkPlayer1Score2() {
            if (ball.xCenter > width) {
                playerOneScore2++;
                ball.vx *= -1;
                ball.reset();
            }
        }

        function checkPlayer2Score() {
            if (ball.xCenter < 0) {
                playerTwoScore++;
                ball.vx *= -1;
                ball.reset();
            }
        }

        function checkGameOver() {
            if (playerOneScore2 >= 5 || playerTwoScore >= 5) {
                playerOneScore2 = 0;
                playerTwoScore = 0;
                updateScores()
                gamePaused = true;
                cancelAnimationFrame(requestId);
                alert("Game Over");
            }
        }

        function updateScores() {
            const playerOneScore2Element = document.getElementById('player-one-score-2');
            const playerTwoScoreElement = document.getElementById('player-two-score');
            playerOneScore2Element.textContent = playerOneScore2;
            playerTwoScoreElement.textContent = playerTwoScore;
        }

        const keysPressed = {};

        document.addEventListener('keydown', function(e) {
            keysPressed[e.key] = true;
            move();
        });

        document.addEventListener('keyup', function(e) {
            keysPressed[e.key] = false;
            move();
        });

        function move() {
            if (keysPressed["ArrowUp"]) {
                playerPad1.y -= playerPad1.vy;
        
                if (playerPad1.y < 0) {
                    playerPad1.y = 0;
                }
            }
        
            if (keysPressed["ArrowDown"]) {
                playerPad1.y += playerPad1.vy;
        
                if (playerPad1.y + 70 > height) {
                    playerPad1.y = height - 70;
                }
            }
        
            if (keysPressed["w"]) {
                playerPad2.y -= playerPad2.vy;
        
                if (playerPad2.y < 0) {
                    playerPad2.y = 0;
                }
            }
        
            if (keysPressed["s"]) {
                playerPad2.y += playerPad2.vy;
        
                if (playerPad2.y + 70 > height) {
                    playerPad2.y = height - 70;
                }
            }

            ctx.clearRect(0, 0, width, height);
            drawDivider(ctx);
            ball.draw(ctx);
            playerPad1.draw(ctx);
            playerPad2.draw(ctx);
        }

        function gameLoop() {
            if (!gamePaused) {
                ctx.clearRect(0, 0, width, height);

                drawDivider(ctx);

                ball.move();
                ball.bounceTwoPlayersMode(twoPlayersCanvas, playerPad1, playerPad2);
                checkScore();
                updateScores();
                
                ball.draw(ctx);
                playerPad1.draw(ctx);
                playerPad2.draw(ctx);

                requestId = requestAnimationFrame(gameLoop);
            }
        }

        playBtn2.addEventListener('click', function () {
            gamePaused = false;
            gameLoop();
        });

        pauseBtn2.addEventListener('click', function () {
            gamePaused = true;
            cancelAnimationFrame(requestId);
        });
    });

    backBtn2.addEventListener('click', function () {
        const twoPlayersCanvas = document.getElementById("two-players-canvas");
        const ctx = twoPlayersCanvas.getContext("2d");
        const width = twoPlayersCanvas.clientWidth;
        const height = twoPlayersCanvas.clientHeight;

        let playerOneScore2 = 0;
        let playerTwoScore = 0;

        function updateScores() {
            const playerOneScore2Element = document.getElementById('player-one-score-2');
            const playerTwoScoreElement = document.getElementById('player-two-score');
            playerOneScore2Element.textContent = playerOneScore2;
            playerTwoScoreElement.textContent = playerTwoScore;
        }

        updateScores();

        ctx.clearRect(0, 0, width, height);

        mainMenu.style.display = 'flex';
        twoPlayersScreen.classList.add('hidden');
    });
});