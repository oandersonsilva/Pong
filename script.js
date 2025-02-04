var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d') // indica que o canvas é um elemento que tudo desenhado nele sera em 2D

  
var teclas = {}

var bola = {
  x: canvas.width / 2 - 15, //posição inicial da bola no eixo x
  y: canvas.height / 2 - 15, //posiçao inicial da bola no eixo y
  altura: 30, // tamanho da bola
  dirx: -1, // direção no eixo x
  diry: 1, // direção no eixo y
  mod: 1, //acaleração da bola
  speed: 3 // velocidade
}
      //bloco da esquerda
var esquerda = {
  x: 50,
  y: canvas.height / 2 - 60,
  altura: 120,
  largura: 30,
  score: 0,
  speed: 15
}

var direita = {
  x: 700,
  y: canvas.height / 2 - 60,
  altura: 120,
  largura: 30,
  score: 0,
  speed: 15
}

 document.addEventListener('keydown', function (e) {
  teclas[e.keyCode] = true
})

     document.addEventListener('keyup', function (e) {
  delete teclas[e.keyCode]
})

function moveBloco() {
  if (87 in teclas && esquerda.y > 0) {
  esquerda.y -= esquerda.speed
  }
  if (83 in teclas && esquerda.y + esquerda.altura < canvas.height) {
  esquerda.y += esquerda.speed
  }
  if (38 in teclas && direita.y>0) {
    direita.y -= direita.speed
  }
  if (40 in teclas && direita.y +     direita.altura < canvas.height) {
    direita.y += direita.speed
  }
}

function moveBola() {
 if (bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura) {
  bola.dirx = 1
  bola.mod += 0.2
        } else if (
          bola.y + bola.altura >= direita.y &&
          bola.y <= direita.y + direita.altura &&
          bola.x + bola.altura >= direita.x
        ) {
          bola.dirx = -1
          bola.mod += 0.2
        }
        if (bola.y <= 0) {
          bola.diry = 1
        } else if (bola.y + bola.altura >= canvas.height) {
          bola.diry = -1
        }
        bola.x += (bola.speed + bola.mod) * bola.dirx
        bola.y += (bola.speed + bola.mod) * bola.diry

        if (bola.x <= 0) {
          newGame('player2')
        } else if (bola.x >= 800) {
          newGame('player1')
        }
      }

      function newGame(winner) {
        if (winner == 'player1') {
          ++esquerda.score
        } else {
          ++direita.score
        }
        esquerda.y = canvas.height / 2 - esquerda.altura / 2
        direita.y = esquerda.y
        bola.y = canvas.height / 2 - 15
        bola.x = canvas.width / 2 - 15
        bola.mod = 0
      }

      function desenha() {
        //atualização do posicionamento das peças
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        moveBloco()
        moveBola()
        ctx.fillStyle = 'white'
        ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura)
        ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura)
        ctx.fillRect(bola.x, bola.y, bola.altura, bola.altura)

        //Placar
        ctx.font = '20px Arial' //definindo a fonte
        ctx.fillText('Player 1: ' + esquerda.score, 50, 20)
        ctx.fillText('Player 2: ' + direita.score, canvas.width - 160, 20)

        //outra forma de atualizar a pagina dentro da função
        //setTimeout(desenha, 20)
      }

      //atualização dos movimentos por tempo

      setInterval(desenha, 20)
