// Este é o script principal do jogo da memória.

// Variáveis para armazenar elementos da página.
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards, interval, firstCard = false, secondCard = false;

/* Aqui nós estamos criando variáveis para armazenar diferentes partes do nosso jogo, 
como o número de movimentos, o tempo, botões na tela, e elementos do jogo, como as cartas.*/

// Variáveis para controlar o tempo, movimentos e vitórias.
let seconds = 0, minutes = 0, movesCount = 0, winCount = 0;

/* Estas variáveis são para controlar o tempo que o jogador está jogando, 
o número de movimentos que o jogador fez e quantas vezes o jogador ganhou.*/

// Função para atualizar o tempo a cada segundo.
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Tempo:</span>${minutesValue}:${secondsValue}`;
};

// Aqui temos uma função que atualiza o tempo a cada segundo. Ou seja, ela faz o relógio do jogo funcionar.

// Função para contar os movimentos do jogador.
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Movimentos:</span>${movesCount}`;
};

// Esta função conta quantos movimentos o jogador fez e atualiza o número na tela.

//array de items
const items = [
    { name: "travel", image: "img/travel.png" },
    { name: "dog", image: "img/dog.png" },
    { name: "coxinha", image: "img/coxinha.png" },
    { name: "cat", image: "img/cat.png" },
    { name: "brigadeiro", image: "img/brigadeiro.png" },
    { name: "empanada", image: "img/empanada.png" },
    { name: "avocado", image: "img/avocado.png" },
    { name: "leaf", image: "img/leaf.png" }
];

// Aqui nós temos uma lista de objetos, cada objeto representa um item do jogo, como um cachorro ou uma coxinha.

// Função para gerar aleatoriamente cartas do jogo.
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

// Esta função cria pares aleatórios de cartas para o jogo.

// Função para criar o tabuleiro de jogo.
const matrixGenerator = (cardValues, size = 4) => {
    // Limpa o conteúdo do tabuleiro.
    gameContainer.innerHTML = "";
  
    // Duplica os valores das cartas para formar os pares.
    cardValues = [...cardValues, ...cardValues];
  
    // Embaralha as cartas.
    cardValues.sort(() => Math.random() - 0.5);
  
    // Cria as cartas no tabuleiro.
    for (let i = 0; i < size * size; i++) {
      gameContainer.innerHTML += `
         <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/></div>
         </div>
      `;
    }
  
    // Define o layout do tabuleiro.
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  
    // Seleciona todas as cartas no tabuleiro.
    cards = document.querySelectorAll(".card-container");
  
    // Adiciona um evento de clique a cada carta.
cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Verifica se a carta já foi combinada (matched) ou está atualmente virada.
      if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
        // Vira a carta clicada.
        card.classList.add("flipped");
  
        // Se esta for a primeira carta clicada (primeira tentativa).
        if (!firstCard) {
          // A carta clicada torna-se a primeira carta.
          firstCard = card;
          // Armazena o valor da primeira carta.
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          // Segunda carta clicada (segunda tentativa).
          // Incrementa o contador de movimentos.
          movesCounter();
          
          // A carta clicada torna-se a segunda carta.
          secondCard = card;
          // Armazena o valor da segunda carta.
          let secondCardValue = card.getAttribute("data-card-value");
  
          // Verifica se as cartas coincidem.
          if (firstCardValue == secondCardValue) {
            // Se as cartas coincidem, adiciona a classe "matched" para que não sejam clicadas novamente.
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
  
            // Reseta a variável da primeira carta para a próxima jogada.
            firstCard = false;
  
            // Incrementa o contador de vitórias, pois o jogador encontrou uma correspondência correta.
            winCount += 1;
  
            // Verifica se o jogador venceu o jogo.
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Você ganhou!</h2><h4>Movimentos: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            // Se as cartas não coincidem, vira as cartas de volta após um breve atraso.
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// Função chamada quando o jogador clica no botão "Iniciar Jogo".
startButton.addEventListener("click", () => {
    // Reinicia contadores.
    movesCount = 0;
    seconds = 0;
    minutes = 0;
  
    // Esconde os controles e mostra o botão "Parar Jogo".
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
  
    // Inicia o cronômetro a cada segundo.
    interval = setInterval(timeGenerator, 1000);
  
    // Atualiza o número de movimentos na interface.
    moves.innerHTML = `<span>Movimentos:</span> ${movesCount}`;
  
    // Inicializa o tabuleiro do jogo.
    initializer();
});

// Função chamada quando o jogador clica no botão "Parar Jogo".
stopButton.addEventListener("click", () => {
    // Mostra os controles e esconde o botão "Parar Jogo".
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
  
    // Para o cronômetro.
    clearInterval(interval);
});

// Função de inicialização do jogo.
const initializer = () => {
    // Limpa a mensagem de resultado.
    result.innerText = "";
  
    // Reinicia o contador de vitórias.
    winCount = 0;
  
    // Gera novas cartas aleatórias e atualiza o tabuleiro.
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

// Função chamada quando o jogador ganha o jogo.
const stopGame = () => {
    // Mostra os controles e esconde o botão "Parar Jogo".
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
  
    // Para o cronômetro.
    clearInterval(interval);
  };
