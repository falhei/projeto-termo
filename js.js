var palavras = ["senso", "termo", "mexer", "nobre", "algoz", "afeto", "plena", "sutil", "vigor", "torax"];

var senha = palavraRandomica(palavras);
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
            if (verificaPalavra(palavra, linha)) {
                document.getElementById("linharesultado").style.visibility = "visible";
                document.getElementById("resultado").style.backgroundColor = "rgb(58, 163, 148)";
                document.getElementById("resultado").innerText = "Acertou";
                document.removeEventListener("keydown", gerenciaTecla);
            }

            palavra = [];
            linha++;
            tentativas--;
            td = 1;

            if (tentativas == 0) {
                document.getElementById("linharesultado").style.visibility = "visible";
                document.getElementById("resultado").style.backgroundColor = "rgb(255, 105, 97)";
                document.getElementById("resultado").innerText = "Errou";
            }
        } else if (event.key == "Backspace") {
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
                td++;
            }
        }
    }
}

function verificaPalavra(palavra, linha) {
    var letrasExistentes = "";
    var posicao = [0, 0, 0, 0, 0];
    var resultado = 0;
    console.log(palavra);
    console.log(senhaSplit);

    //Verifica quais acertou
    var td = 1;
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
    var td = 1;
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
    var td = 1;
    for (var i = 0; i < palavra.length; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        if (posicao[i] == 0) {
            dado.style.backgroundColor = "rgb(255, 105, 97)";
        }
        td++;
    }

    if (resultado == 5) {
        return true;
        //teste
    }

    return false;
}