var divPrincipal = document.getElementById("principal");

criaLinha(divPrincipal);
criaCelula();

var palavras = ["senso", "termo", "mexer", "nobre", "algoz", "afeto", "plena", "sutil", "vigor", "torax"];

var senha = palavraRandomica(palavras).toUpperCase();
var senhaSplit = senha.split("");
var body = document.body;
var linha = 1;
var td = 1;
var palavra = [];
var tentativas = 6;

console.log(senha);

function palavraRandomica(palavras) {
    return palavras[Math.floor(Math.random() * palavras.length)]; // <<< Randomização com vetor dinâmico
}

document.addEventListener("keydown", gerenciaTecla);



function gerenciaTecla() {
    if (linha < 7) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        if (event.key == "Enter" && palavra.length >= 5 && palavra.length != 0) {
            verificaPalavra(palavra, linha);
            palavra = [];
            linha++;
            tentativas--;
            td = 1;
            if (tentativas == 0) {
                perdeu();
            }

        } else
        if (event.key == "Backspace") {
            if (td >= 2) {
                td--;
                var dadoAnterior = document.getElementById("linha" + linha + "-td" + td);
                dadoAnterior.innerHTML = "";
                palavra.pop();
            }
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (td != 6) {
                dado.innerHTML = event.key;
                palavra.push(event.key);
                //criaFlip(linha, event.key);
                td++;
            }
        }
    }

}

function criaFlip(linha, valor) {
    var linha = document.getElementById("linha" + linha);
    var tdFlip = document.createElement("td");
    tdFlip.className = "cardFlip";
    tdFlip.style.transform = "rotateY(180deg)";
    tdFlip.innerHTML = valor;
    linha.appendChild(tdFlip);
}

function criaTd() {
    document.createElement("linha" + linha + "-td" + td);
}

// for (var t = 0; t < palavra.length; t++) {
//     var flip = document.getElementById("linha" + linha + "-td" + td);
//     flip.style.transform = "rotateY(180deg)";
//     flip.style.transition = "1s";
//     td++;
// }

function verificaPalavra(palavra, linha) {
    var letrasExistentes = "";
    var posicao = [0, 0, 0, 0, 0];
    var resultado = 0;
    var td = 1;
    console.log(palavra);
    console.log(senhaSplit);

    for (var p = 0; p < palavra.length; p++) {
        palavra[p] = palavra[p].toUpperCase();
    }

    //Verifica quais acertou
    for (var i = 0; i < palavra.length; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        for (var j = 0; j < senhaSplit.length; j++) {
            if (palavra[i] == senhaSplit[j] && i == j) {
                letrasExistentes += palavra[i];
                posicao[i] = 1;
                resultado++;
                dado.style.backgroundColor = "rgb(58, 163, 148)";
            }
        }
        td++;
    }

    //Verifica quais errou, mas existem
    td = 1;
    for (var i = 0; i < palavra.length; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        for (var j = 0; j < senhaSplit.length; j++) {
            if ((palavra[i] == senhaSplit[j] && j != i) &&
                letrasExistentes.indexOf(palavra[i]) < 0 &&
                posicao[i] == 0) {
                letrasExistentes += palavra[i];
                posicao[i] = 2;
                dado.style.backgroundColor = "rgb(211, 173, 105)";
            }
        }
        td++;
    }

    //Verifica quais não existem
    td = 1;
    for (var i = 0; i < palavra.length; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        if (posicao[i] == 0) {
            dado.style.backgroundColor = "rgb(255, 105, 97)";
        }
        td++;
    }

    //transform nos td
    // for (var t = 0; t < palavra.length; t++) {
    //     var flip = document.getElementById("linha" + linha + "-td" + td);
    //     flip.style.transform = "rotateY(180deg)";
    //     flip.style.transition = "1s";
    //     td++;
    // }

    if (resultado == 5) {
        ganhou(linha);
        return true;
    }

    return false;
}

//
function ganhou(tentativas) {
    setTimeout(() => {
        alert("Você acertou a palavra! \nNúmero de tentativas: " + tentativas);
        location.reload();
    }, 500);
}

function perdeu() {
    setTimeout(() => {
        alert("Você errou a palavra! \nA palavra correta era: " + senha);
        location.reload();
    }, 500);
}




function criaLinha(divPrincipal) {
    for (var i = 1; i < 7; i++) {
        var linha = document.createElement("div");
        linha.id = "linha" + i;
        linha.className = "linha";
        divPrincipal.appendChild(linha);
    }
}

function criaCelula() {
    var linha = 1;
    var dado = 1;
    for (var i = 1; i < 31; i++) {
        var celula = document.createElement("div");
        var linhaDiv = document.getElementById("linha" + linha);
        celula.id = "linha" + linha + "-td" + dado;
        celula.className = "celula";
        //celula.innerHTML = "X";
        linhaDiv.appendChild(celula);
        if (i % 5 == 0) {
            linha++;
            dado = 0;
        }
        dado++;
    }
}