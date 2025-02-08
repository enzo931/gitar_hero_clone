let isGameActive = false; // Variável para controlar o estado do jogo
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Posições relativas para as linhas
const positions = [0.2, 0.4, 0.6, 0.8]; // Posições para as linhas no canvas
const colors = ['red', 'green', 'blue', 'yellow']; // Cores para os círculos

let fallingCircles = []; // Array para armazenar os círculos coloridos
let score = 0; // Variável para o score
let life = 100; // Vida inicial do jogador




function updateLifeBar() {
    const lifeBar = document.getElementById("life-bar");
    lifeBar.style.width = `${life}%`;
}



// Mapeamento das teclas para as cores
const keyMap = {
    'a': 'red',     // Tecla "A" para a cor vermelha
    's': 'green',   // Tecla "S" para a cor verde
    'l': 'blue',    // Tecla "L" para a cor azul
    'ç': 'yellow'   // Tecla "Ç" para a cor amarela
};

// Função para iniciar o jogo
function startGame() {

     


    document.getElementById("start-button").style.display = "none";
    const title = document.getElementById("title");
    title.style.transform = "translateX(30vw)";

    setTimeout(() => {
        const musicList = document.getElementById("music-list");
        musicList.style.display = "block";
        musicList.style.opacity = "1";
    }, 1000);
}


// Função para selecionar uma música
let selectedSong = '';  // Variável para armazenar a música selecionada

// Função para selecionar uma música
function selectSong(song, imageSrc, description) {
    const title = document.getElementById("title");
    const musicList = document.getElementById("music-list");
    const selectedSongDiv = document.getElementById("selected-song");
    const songDetailsDiv = document.getElementById("song-details");
    const songImage = document.getElementById("song-image");
    const songDescription = document.getElementById("song-description");

    title.style.display = "none";
    musicList.style.display = "none";

    selectedSongDiv.style.display = "block";
    songDetailsDiv.style.display = "block";
    songDetailsDiv.style.opacity = "1";

    // Aqui é onde a descrição da música com <br> vai funcionar
    songDescription.innerHTML = description;  // Usando innerHTML para garantir que o <br> seja interpretado corretamente
    songImage.src = imageSrc;

    // Armazenamos a música selecionada
    selectedSong = song;
}


// Função para voltar para a lista de músicas
function goBack() {
    const title = document.getElementById("title");
    const songDetailsDiv = document.getElementById("song-details");
    const musicList = document.getElementById("music-list");
    const selectedSongDiv = document.getElementById("selected-song");

    songDetailsDiv.style.display = "none";
    musicList.style.display = "block";
    title.style.display = "block";
    selectedSongDiv.style.display = "none";
}

// Função para iniciar a sessão de jogo
function startGameSession() {
    // Exibe a tela de 'Como Jogar'
    const howToPlay = document.getElementById("how-to-play");
    howToPlay.style.display = "flex";  // Torna a tela de 'Como Jogar' visível

    // Espera o jogador fechar a tela de como jogar
    const closeHowToPlayButton = document.getElementById('close-how-to-play');
    closeHowToPlayButton.onclick = () => {
        howToPlay.style.display = "none";  // Fecha a tela de 'Como Jogar'
        startRealGame();  // Inicia o jogo de fato
    };

    // Esconde a imagem, descrição e botões quando o jogador clica em "Jogar"
    const songDetailsDiv = document.getElementById("song-details");
    const songImage = document.getElementById("song-image");
    const songDescription = document.getElementById("song-description");
    const playButton = document.getElementById("play-button");
    const backButton = document.getElementById("back-button");

    songDetailsDiv.style.display = "none";  // Esconde a descrição
    songImage.style.display = "none";      // Esconde a imagem
    songDescription.style.display = "none"; // Esconde a descrição
    playButton.style.display = "none";     // Esconde o botão "Jogar"
    backButton.style.display = "none";     // Esconde o botão "Voltar"
}

// Função que realmente inicia o jogo após fechar a tela de 'Como Jogar'

let fallSpeed = 4;  // Variável global para controlar a velocidade de queda das bolinhas

function startRealGame() {
    isGameActive = true;

    // Exibe a barra de vida
    document.getElementById("life-bar-container").style.display = "block"; 

    const gameArea = document.getElementById("game-area");
    gameArea.style.display = "block"; // Exibe a área do jogo

    startCountdown(); // Inicia a contagem regressiva
    drawLines(); // Desenha as linhas de base

    // Lógica para tocar a música conforme a seleção
    const backgroundAudio = document.getElementById("background-audio");

    console.log("Música selecionada:", selectedSong);  // Verificar qual música foi escolhida

    if (selectedSong === 'Finish Line By Skilled') {
        console.log("Tocando música: Finish Line");
        backgroundAudio.src = 'Skillet - Finish Line [Official Audio] (1).opus';  // Arquivo de música Finish Line
        backgroundAudio.play().catch(error => console.log("Erro ao tentar tocar Finish Line:", error)); // Toca a música Finish Line
        fallSpeed = 10; // Ajusta a velocidade para a música Finish Line
    } else if (selectedSong === 'Monster By Skilled') {
        console.log("Tocando música: Monster");
        backgroundAudio.src = 'Skillet-Monster__Lyrics_Video_.mp3';  // Arquivo de música Monster
        backgroundAudio.play().catch(error => console.log("Erro ao tentar tocar Monster:", error)); // Toca a música Monster
        fallSpeed = 10; // Ajusta a velocidade para a música Monster
    } else if (selectedSong === 'The Resistance By Skilled') {
        console.log("Tocando música: The Resistance");
        backgroundAudio.src = 'Skillet_-_The_Resistance__Official_Audio_.mp3';  // Arquivo de música The Resistance
        backgroundAudio.play().catch(error => console.log("Erro ao tentar tocar The Resistance:", error)); // Toca a música The Resistance
        fallSpeed = 5; // Ajusta a velocidade para a música The Resistance
    } else if (selectedSong === 'Legendary By Skilled') {
        console.log("Tocando música: Legendary");
        backgroundAudio.src = 'Skillet - Legendary (Official Video) (1).m4a';  // Arquivo de música Legendary
        backgroundAudio.play().catch(error => console.log("Erro ao tentar tocar Legendary:", error)); // Toca a música Legendary
        fallSpeed = 5; // Ajusta a velocidade para a música Legendary
    } else if (selectedSong === 'Feel Invincible By Skilled') {
        console.log("Tocando música: Feel Invincible");
        backgroundAudio.src = 'Skillet - _Feel Invincible_ [Official Music Video] (1).m4a';  // Arquivo de música Feel Invincible
        backgroundAudio.play().catch(error => console.log("Erro ao tentar tocar Feel Invincible:", error)); // Toca a música Feel Invincible
        fallSpeed = 5; // Ajusta a velocidade para a música Feel Invincible
    } else {
        console.log("Nenhuma música foi selecionada ou algo deu errado.");
        backgroundAudio.pause(); // Pausa qualquer música se outra for escolhida
    }

    // Exibe o score após começar o jogo
    showScoreAfterClose(); // Função para mostrar o score
}








// Função para exibir a contagem regressiva
function startCountdown() {
    const prepareText = document.getElementById("prepare-text");
    const countdownText = document.getElementById("countdown-text");
    let countdown = 3;

    // Exibe a mensagem "Prepare-se!"
    prepareText.style.display = "block";
    countdownText.style.display = "block";

    // Intervalo para contagem regressiva
    const interval = setInterval(() => {
        countdownText.innerText = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(interval); // Para o intervalo quando a contagem termina
            prepareText.style.display = "none"; // Esconde "Prepare-se!"
            countdownText.style.display = "none"; // Esconde o número da contagem
            startFallingCircles(); // Inicia a queda das bolinhas após a contagem
        }
    }, 1000); // A cada 1 segundo
}



// Função para desenhar as linhas no canvas
function drawLines() {
    const lineWidth = 4;
    const lineHeight = canvas.height;

    positions.forEach(position => {
        const x = position * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, lineHeight);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    });
}

// Função para iniciar a queda dos círculos
function startFallingCircles() {
    // Mapeia o valor de fallSpeed para o tempo entre a queda das bolinhas
    const intervalTime = Math.max(1000 - (fallSpeed * 50), 100);  // Mínimo de 100ms para evitar valores muito rápidos

    fallingCirclesInterval = setInterval(() => {
        const lineIndex = Math.floor(Math.random() * positions.length); // Escolhe aleatoriamente uma linha
        const color = colors[lineIndex]; // A cor da bolinha é baseada na linha
        const x = positions[lineIndex] * canvas.width; // Posição x da linha

        fallingCircles.push({
            x: x,
            y: 0,
            radius: 10,
            color: color,
            shape: "circle" // Formato padrão
        });
    }, intervalTime); // O intervalo é ajustado de acordo com a velocidade da música
}




// Alteração na função que desenha as bolinhas para usar a nova variável fallSpeed
function drawFallingCircles() {
    fallingCircles.forEach((circle, index) => {
        circle.y += fallSpeed; // Agora a velocidade da queda é baseada na música

        if (circle.shape === "circle") {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.closePath();
        } else if (circle.shape === "square") {
            ctx.fillStyle = circle.color;
            ctx.fillRect(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
        }

        // Posição do botão no canvas
        const buttonHeight = 80;  // Altura do botão
        const buttonY = canvas.height - buttonHeight - 20;  // Distância do botão do fundo

        // Verifica se a bolinha passou completamente do botão
        if (circle.y > buttonY + buttonHeight) {
            // Se a bolinha passar do botão sem ser acertada, diminui a vida
            life -= 10;  // Diminui 10% de vida
            if (life < 0) {
                life = 0;
            }
            updateLifeBar(); // Atualiza a barra de vida
            fallingCircles.splice(index, 1); // Remove a bolinha da tela
        }
    });
}



// Função para alterar o formato das bolinhas
function changeBallShape(shape) {
    fallingCircles.forEach(circle => {
        circle.shape = shape;
    });
}

// Função para detectar os acertos do jogador
function hitNote(color) {
    for (let i = 0; i < fallingCircles.length; i++) {
        const circle = fallingCircles[i];
        if (circle.color === color && circle.y >= canvas.height - 40) {
            fallingCircles.splice(i, 1);
            score++;
            console.log(`Nota ${color} acertada! Pontuação: ${score}`);

            // Aumenta a vida em 5% quando acerta
            life += 5;  
            if (life > 100) { // Garantir que a vida não ultrapasse 100%
                life = 100;
            }
            updateLifeBar(); // Atualiza a barra de vida

            // Atualiza o score fora do canvas
            document.getElementById("score").textContent = score;
            break;
        }
    }
}


// Evento de detecção de teclado
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase(); 
    
    if (keyMap[key]) {
        hitNote(keyMap[key]);
    }

    if (key === 'c') {
        changeBallShape('circle');
    } else if (key === 'q') {
        changeBallShape('square');
    }
});

// Função para mostrar o score depois de fechar a tela "Como Jogar"
function showScoreAfterClose() {
    document.getElementById("score-container").style.display = "block"; // Exibe o score
}


let gameOverContainer = null; // Guardará o contêiner de Game Over
let gameOverMessage = null; // Guardará a mensagem de Game Over
let restartButton = null; // Guardará o botão de reinício
let finalScoreText = null; // Guardará o texto do score final

function gameLoop() {
    if (!isGameActive) return;

    if (life <= 0) {
        // Fim de jogo: Esconde todos os elementos do jogo
        document.getElementById("game-area").style.display = "none";  // Esconde a área do jogo
        document.getElementById("life-bar-container").style.display = "none";  // Esconde a barra de vida
        document.getElementById("score-container").style.display = "none";  // Esconde o score

        // Para a música de fundo
        const backgroundAudio = document.getElementById("background-audio");
        backgroundAudio.pause();  // Pausa a música
        backgroundAudio.currentTime = 0;  // Reseta a música para o início

        // Cria o contêiner de Game Over (cria apenas uma vez)
        if (!gameOverContainer) {
            gameOverContainer = document.createElement("div");
            gameOverContainer.id = "game-over-container";
            document.body.appendChild(gameOverContainer);  // Adiciona o contêiner na tela
        }

        // Exibe a mensagem de "Fim de Jogo" (cria apenas uma vez)
        if (!gameOverMessage) {
            gameOverMessage = document.createElement("div");
            gameOverMessage.id = "game-over-message";
            gameOverMessage.textContent = "Fim de Jogo!";
            gameOverContainer.appendChild(gameOverMessage);  // Adiciona a mensagem no contêiner
        }

        // Cria o botão de reinício (cria apenas uma vez)
        if (!restartButton) {
            restartButton = document.createElement("button");
            restartButton.textContent = "Reiniciar";
            restartButton.id = "restart-button";  // Agora com ID para aplicar o CSS da animação
            restartButton.onclick = () => {
                // Resetando o jogo
                location.reload();  // Simplesmente recarrega a página, reiniciando o jogo
            };
            gameOverContainer.appendChild(restartButton);  // Adiciona o botão no contêiner
        }

        // Exibe o score final (cria apenas uma vez)
        if (!finalScoreText) {
            finalScoreText = document.createElement("div");
            finalScoreText.id = "final-score";
            finalScoreText.textContent = `Score Final: ${score}`;
            gameOverContainer.appendChild(finalScoreText);  // Adiciona o texto do score no contêiner
        }

        // Desativa o jogo
        isGameActive = false;  // Desativa o jogo
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawFallingCircles();
}





  
// Chama o gameLoop a cada 16ms (60FPS)
setInterval(gameLoop, 16);




