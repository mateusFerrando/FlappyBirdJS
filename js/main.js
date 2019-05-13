
var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");
var continua = true;

//Elemento do jogo
var koe = new Image();
var bg =  new Image();
var chao = new Image();
var canoCima = new Image();
var canoBaixo = new Image();

koe.src="img/bird.png";
bg.src= "img/bg.png" ;
chao.src="img/fg.png";
canoCima.src="img/pipeNorth.png";
canoBaixo.src="img/pipeSouth.png";

var intervaloCanos = 85;
var constante;
var posicaoX = 10;
var posicaoY = 150;
var gravidade = 2;
var gravidadeAnterior = gravidade;
var pontuacao = 0;

var voo = new Audio();
var somPonto = new Audio();

voo.src="som/fly.mp3";
somPonto.src = "som/score.mp3";

//Esperando algo acontecer
document.addEventListener("keydown",pular);

document.getElementById("jogar").addEventListener("click",jogarNovamente);

function jogarNovamente(){
	continua = true;
	gravidade = gravidadeAnterior;
	pontuacao = 0;
	posicaoY = 150;
	document.getElementById("pontos").innerHTML = pontuacao;
	document.getElementById("game_over").style = "display:none";
	
	canos = [];

	canos[0] = {
	  x: stage.width,
	  y:0
	};  
	
}

function gameOver(){
	continua = false;
	document.getElementById("pontos").innerHTML = pontuacao;
	document.getElementById("game_over").style = "display:inline";
	gravidade=0;
}

function pular (){
	
	if(!continua){
	   return false;
	}
	
	gravidade -= 8.0; 
	voo.play();
	setTimeout(function(){
		gravidade = gravidadeAnterior;
	},60);
}

var canos = [];

canos[0] = {
  x: stage.width,
  y:0
};    

//DA A VIDA PRO JOGO
function desenhar(){
	//imagem posicao x e y
	ctx.drawImage(bg,0,0);
	
	if(continua){
		for(var i = 0; i < canos.length; i++){
			constante = canoCima.height + intervaloCanos;
			ctx.drawImage(canoCima,canos[i].x,canos[i].y);
			ctx.drawImage(canoBaixo,canos[i].x,canos[i].y+constante);
			canos[i].x--;

			if(canos[i].x == 135){
				canos.push({
					x:stage.width,
					y: Math.floor((Math.random() * canoCima.height) - canoCima.height)
				});   
			}

			if(posicaoX + koe.width >= canos[i].x && posicaoX <= canos[i].x + canoCima.width 
			   && (posicaoY <= canos[i].y + canoCima.height || posicaoY + koe.width >= canos[i].y + constante) || posicaoY + koe.height >= stage.height - chao.height){
			   gameOver();
			}

			if(canos[i].x == 5){
				pontuacao++;
				somPonto.play();
			}
		}
	}
	
	//Desenha chao
	ctx.drawImage(chao,0,bg.height-chao.height);
	
	//Desenhar Koe
	var bd = ctx.drawImage(koe,posicaoX,posicaoY);
	posicaoY += gravidade;
	
	var tamanhoCanvas = stage.width / 2 - 10;
	
	//DESENHA PONTUACAO
	ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#000";
	ctx.font = "70px Flappy";
	ctx.fillText(pontuacao,tamanhoCanvas,80);
	ctx.strokeText(pontuacao,tamanhoCanvas,80);
	
	requestAnimationFrame(desenhar);
}



window.onload = function(){
	desenhar();
}
