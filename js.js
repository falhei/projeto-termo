// 1. Crie em HTML um tabuleiro do jogo, composto por
// elementos de forma a ser capaz de apresentar 6
// palavras com 5 letras cada, conforme imagem abaixo. 

var divPrincipal = document.getElementById("principal");
criaLinha(divPrincipal);
criaCelula();

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
        linhaDiv.appendChild(celula);
        if (i % 5 == 0) {
            linha++;
            dado = 0;
        }
        dado++;
    }
}

// 2. Crie um vetor que armazena uma lista de palavras a serem usadas no jogo como
// senha, bem como uma função que seleciona aleatoriamente a palavra a ser
// descoberta pelo jogador. A palavra a ser descoberta deverá ser armazenada na
// variável senha.

var palavras = ["senso", "termo", "mexer", "nobre", "algoz", "afeto", "plena", "sutil", "vigor", "torax"];

function palavraRandomica(palavras) {
    return palavras[Math.floor(Math.random() * palavras.length)]; // <<< Randomização com vetor dinâmico
}

var senha = palavraRandomica(palavras).toUpperCase();
var senhaSplit = senha.split("");

var linha = 1;
var td = 1;
var palavra = [];
var tentativas = 6;

console.log(senha);

// 3. Crie um mecanismo que gerenciará, dentre as 6 entradas de palavras no
// tabuleiro, os elementos html relacionados a tentativa da vez. Dica: para fazer
// isso sugerimos criar uma variável que controla quantas tentativas de palavra o
// jogador já realizou e associar de alguma forma essas tentativas aos ids dos
// elementos que compõe cada entrada de palavra do tabuleiro.

document.addEventListener("keydown", gerenciaTecla);


// 4. Crie uma função chamada gerenciaTecla associada ao método de pressionar
// teclas do teclado. (0,5)

// 5. Desenvolva a função gerenciaTecla de forma que ela verifique qual o caractere
// pressionado e, se for uma letra (A-Z), após torná-la maiúscula, verifica a
// quantidade de letras preenc, phidas para a tentativa corrente e, caso ainda não
// tenha chegado a cinco letrasreenche uma letra da palavra. Caso contrário a
// letra deverá ser desconsiderada. 

evidenciaLinha(linha);

function gerenciaTecla() {
    if (linha < 7) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        // 7. Crie na função gerenciaTecla um controle para o caso de o usuário clicar na tecla
        // ENTER. Nesse caso, deverá ser verificado se as 5 letras da palavra foram
        // preenchidas e então verificar se o usuário acertou a palavra armazenada em
        // senha. (1,0)

        if (event.key == "Enter" && palavra.length >= 5 && palavra.length != 0) {
            verificaPalavra(palavra, linha);
            palavra = [];
            linha++;
            tentativas--;
            td = 1;
            if (tentativas == 0) {
                perdeu();
            }
            evidenciaLinha(linha);

        } else
        // 6. Crie na função gerenciaTecla um controle para o caso de o usuário clicar no
        // backspace, fazendo com que uma letra seja apagada da tentativa.

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
                td++;
            }
        }
    }

}


function criaTransicao(linha) {
    for (var i = 1; i < 6; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + i);
        dado.style.transform = "rotate(360deg)";
        dado.style.transition = "1s";
    }
}

function evidenciaLinha(linha) {
    for (var i = 1; i < 6; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + i);
        dado.style.backgroundColor = "#6E5C62";
    }
}


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

    // 8. Crie um mecanismo a ser executado ou chamado em gerenciaTecla que testa
    // cada letra da palavra tentada, pintando de verde letras que estão corretas.

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

    // 9. Crie um modo de testar letras que existem na senha, mas estão em posição
    // incorreta na tentativa, pintando as mesmas de amarelo.

    // 10. Controle a ocorrência de letras repetidas na palavra (Por exemplo a tentativa do
    // Jogador era TESTE e a senha era ATOMO. Nesse caso apenas o primeiro T deverá
    // ser pintado de amarelo.

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

    // 11. Crie um mecanismo que pinta de vermelho letras da tentativa que não existem
    // na senha.
    td = 1;
    for (var i = 0; i < palavra.length; i++) {
        var dado = document.getElementById("linha" + linha + "-td" + td);

        if (posicao[i] == 0) {
            dado.style.backgroundColor = "rgb(255, 105, 97)";
        }
        td++;
    }

    criaTransicao(linha);

    if (resultado == 5) {
        ganhou(linha);
        return true;
    }

    return false;
}


// 12. Crie uma função que apresenta uma mensagem informando que o usuário
// acertou a palavra, chamando a mesma somente nesse caso.

function ganhou(tentativas) {
    setTimeout(() => {
        alert("Você acertou a palavra! \nNúmero de tentativas: " + tentativas);
        location.reload();
    }, 500);

}

// 13. Crie um mecanismo que gerencia as tentativas do usuário, garantindo que em
// caso de uma tentativa incorreta, o sistema passe para uma nova tentativa na
// linha de baixo do tabuleiro ou, caso as tentativas já tenham se esgotado,
// apresente uma mensagem dizendo que o jogador perdeu. 

function perdeu() {
    setTimeout(() => {
        alert("Você errou a palavra! \nA palavra correta era: " + senha);
        location.reload();
    }, 500);
}