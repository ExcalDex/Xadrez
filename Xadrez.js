function configuretable() {
    let tabuleirodoc = document.querySelectorAll('.area');
    let ciclo = true;
    for (let i = 0; i < 64; i++) {
        if (i % 8 == 0) {
            if (ciclo) {
                ciclo = false;
            } else {
                ciclo = true;
            }
        }
        if (!ciclo) {
            if (i % 2 == 0) {
                tabuleirodoc[i].style.backgroundColor = 'rgb(219, 215, 192)';
            } else {
                tabuleirodoc[i].style.backgroundColor = 'brown';
            }
        } else {
            if (i % 2 == 0) {
                tabuleirodoc[i].style.backgroundColor = 'brown';
            } else {
                tabuleirodoc[i].style.backgroundColor = 'rgb(219, 215, 192)';
            }
        }
    }
    tabuleirodoc[0].innerHTML = '<img src="b_rook.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[1].innerHTML = '<img src="b_knight.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[2].innerHTML = '<img src="b_bishop.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[3].innerHTML = '<img src="b_queen.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[4].innerHTML = '<img src="b_king.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[5].innerHTML = '<img src="b_bishop.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[6].innerHTML = '<img src="b_knight.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[7].innerHTML = '<img src="b_rook.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[8].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[9].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[10].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[11].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[12].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[13].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[14].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[15].innerHTML = '<img src="b_pawn.png" alt="peca" width=100% height=100%>';

    tabuleirodoc[63].innerHTML = '<img src="w_rook.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[62].innerHTML = '<img src="w_knight.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[61].innerHTML = '<img src="w_bishop.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[60].innerHTML = '<img src="w_king.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[59].innerHTML = '<img src="w_queen.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[58].innerHTML = '<img src="w_bishop.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[57].innerHTML = '<img src="w_knight.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[56].innerHTML = '<img src="w_rook.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[55].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[54].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[53].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[52].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[51].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[50].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[49].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
    tabuleirodoc[48].innerHTML = '<img src="w_pawn.png" alt="peca" width=100% height=100%>';
}
const game = {
    phase: true,
    turn: 8,
    peca: null
}
const blackroque = {
    lr: true,
    rr: true,
    k: true
}
const whiteroque = {
    lr: true,
    rr: true,
    k: true
}
const check = {
    w: false,
    b: false,
}
function jogada(space) {
    let mesa = new Mesa();
    let tabuleiro = mesa.maketable();
    if (game.phase) {
        if (tabuleiro.tipo[space] == 6) {
            game.peca = new pawn();
            game.peca.cor = tabuleiro.cor[space];
        }
        if (tabuleiro.tipo[space] == 1 || tabuleiro.tipo[space] == 7) {
            game.peca = new rook();
            game.peca.cor = tabuleiro.cor[space];
        }
        if (tabuleiro.tipo[space] == 2) {
            game.peca = new knight();
            game.peca.cor = tabuleiro.cor[space];
        }
        if (tabuleiro.tipo[space] == 3) {
            game.peca = new bishop();
            game.peca.cor = tabuleiro.cor[space];
        }
        if (tabuleiro.tipo[space] == 4) {
            game.peca = new queen();
            game.peca.cor = tabuleiro.cor[space];
        }
        if (tabuleiro.tipo[space] == 5) {
            game.peca = new king();
            game.peca.cor = tabuleiro.cor[space];
        }
        game.phase = false;
        game.peca.coord = space;
        mesa.highlight(tabuleiro, space, false);
    } else {
        mesa.move(tabuleiro, space);
        game.phase = true;
    }
}
class Mesa {
    constructor() {
        this.maketable = function () {
            let tabuleirodoc = document.querySelectorAll('.area');
            let tabuleiro = {
                tipo: [],
                cor: []
            };
            let flag = true;
            for (let i = 0; i < 64; i++) {
                if (tabuleirodoc[i].innerHTML.includes('w_')) {
                    tabuleiro.cor[i] = 8;
                    if (tabuleirodoc[i].innerHTML.includes('rook')) {
                        if (flag) {
                            tabuleiro.tipo[i] = 1;
                            flag = false;
                        }
                        else {
                            tabuleiro.tipo[i] = 7;
                            flag = true;
                        }
                    } else {
                        if (tabuleirodoc[i].innerHTML.includes('knight')) {
                            tabuleiro.tipo[i] = 2;
                        } else {
                            if (tabuleirodoc[i].innerHTML.includes('bishop')) {
                                tabuleiro.tipo[i] = 3;
                            } else {
                                if (tabuleirodoc[i].innerHTML.includes('queen')) {
                                    tabuleiro.tipo[i] = 4;
                                } else {
                                    if (tabuleirodoc[i].innerHTML.includes('king')) {
                                        tabuleiro.tipo[i] = 5;
                                    } else {
                                        if (tabuleirodoc[i].innerHTML.includes('pawn')) {
                                            tabuleiro.tipo[i] = 6;
                                        } else {
                                            tabuleiro.tipo[i] = 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (tabuleirodoc[i].innerHTML.includes('b_')) {
                        tabuleiro.cor[i] = 16;
                        if (tabuleirodoc[i].innerHTML.includes('rook')) {
                            if (flag) {
                                tabuleiro.tipo[i] = 1;
                                flag = false;
                            }
                            else {
                                tabuleiro.tipo[i] = 7;
                                flag = true;
                            }
                        } else {
                            if (tabuleirodoc[i].innerHTML.includes('knight')) {
                                tabuleiro.tipo[i] = 2;
                            } else {
                                if (tabuleirodoc[i].innerHTML.includes('bishop')) {
                                    tabuleiro.tipo[i] = 3;
                                } else {
                                    if (tabuleirodoc[i].innerHTML.includes('queen')) {
                                        tabuleiro.tipo[i] = 4;
                                    } else {
                                        if (tabuleirodoc[i].innerHTML.includes('king')) {
                                            tabuleiro.tipo[i] = 5;
                                        } else {
                                            if (tabuleirodoc[i].innerHTML.includes('pawn')) {
                                                tabuleiro.tipo[i] = 6;
                                            } else {
                                                tabuleiro.tipo[i] = 0;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        tabuleiro.cor[i] = 0;
                        tabuleiro.tipo[i] = 0;
                    }
                }
            }
            return tabuleiro;
        };
        this.highlight = function (tabuleiro, coord) {
            if (tabuleiro.tipo[coord] != 5)
                var posipos = game.peca.calc(tabuleiro, coord, false, game.turn);
            else
                var posipos = game.peca.calc(tabuleiro, coord, false, whiteroque.rr, whiteroque.lr, whiteroque.k, blackroque.rr, blackroque.lr, blackroque.k, game.turn);
            if (posipos != -1) {
                let espacos = document.querySelectorAll('.area');
                for (let i = 0; i < posipos.length && posipos[i] != -1; i++) {
                    espacos[posipos[i]].style.backgroundColor = 'red';
                }
            } else {
                game.phase = true;
            }
        }
        this.unhighlight = function () {
            let tabuleirodoc = document.querySelectorAll('.area');
            let ciclo = true;
            for (let i = 0; i < 64; i++) {
                if (i % 8 == 0) {
                    if (ciclo) {
                        ciclo = false;
                    } else {
                        ciclo = true;
                    }
                }
                if (!ciclo) {
                    if (i % 2 == 0) {
                        tabuleirodoc[i].style.backgroundColor = 'rgb(219, 215, 192)';
                    } else {
                        tabuleirodoc[i].style.backgroundColor = 'brown';
                    }
                } else {
                    if (i % 2 == 0) {
                        tabuleirodoc[i].style.backgroundColor = 'brown';
                    } else {
                        tabuleirodoc[i].style.backgroundColor = 'rgb(219, 215, 192)';
                    }
                }
            }
        }
        this.move = function (tabuleiro, coord, flag) {
            let tabuleirodoc = document.querySelectorAll('.area');
            if (flag || (tabuleirodoc[coord].style.backgroundColor != 'rgb(219, 215, 192)' && tabuleirodoc[coord].style.backgroundColor != 'brown')) {
                if (tabuleiro.tipo[coord] == 7) {
                    if (tabuleiro.cor[coord] == 8) whiteroque.rr = false;
                    if (tabuleiro.cor[coord] == 16) blackroque.rr = false;
                }
                if (tabuleiro.tipo[coord] == 1) {
                    if (tabuleiro.cor[coord] == 8) whiteroque.lr = false;
                    if (tabuleiro.cor[coord] == 16) blackroque.lr = false;
                }
                if (tabuleiro.tipo[game.peca.coord] == 7) {
                    if (tabuleiro.cor[game.peca.coord] == 8) whiteroque.rr = false;
                    if (tabuleiro.cor[game.peca.coord] == 16) blackroque.rr = false;
                }
                if (tabuleiro.tipo[game.peca.coord] == 1) {
                    if (tabuleiro.cor[game.peca.coord] == 8) whiteroque.lr = false;
                    if (tabuleiro.cor[game.peca.coord] == 16) blackroque.lr = false;
                }
                if (tabuleiro.tipo[game.peca.coord] == 5) {
                    if (tabuleiro.cor[game.peca.coord] == 8) whiteroque.k = false;
                    if (tabuleiro.cor[game.peca.coord] == 16) blackroque.k = false;
                }
                //Roque direito
                if (tabuleiro.tipo[game.peca.coord] == 5 && coord == game.peca.coord + 2 && tabuleiro.cor[game.peca.coord] == 16) {
                    tabuleirodoc[coord - 1].innerHTML = '<img src="b_rook.png" alt="peca" width=100% height=100%>';
                    tabuleirodoc[coord + 1].innerHTML = '';
                }
                if (tabuleiro.tipo[game.peca.coord] == 5 && coord == game.peca.coord + 2 && tabuleiro.cor[game.peca.coord] == 8) {
                    tabuleirodoc[coord - 1].innerHTML = '<img src="w_rook.png" alt="peca" width=100% height=100%>';
                    tabuleirodoc[coord + 1].innerHTML = '';
                }
                //Roque esquerdo
                if (tabuleiro.tipo[game.peca.coord] == 5 && coord == game.peca.coord - 2 && tabuleiro.cor[game.peca.coord] == 16) {
                    tabuleirodoc[coord + 1].innerHTML = '<img src="b_rook.png" alt="peca" width=100% height=100%>';
                    tabuleirodoc[coord - 2].innerHTML = '';
                }
                if (tabuleiro.tipo[game.peca.coord] == 5 && coord == game.peca.coord - 2 && tabuleiro.cor[game.peca.coord] == 8) {
                    tabuleirodoc[coord + 1].innerHTML = '<img src="w_rook.png" alt="peca" width=100% height=100%>';
                    tabuleirodoc[coord - 2].innerHTML = '';
                }

                let vaux = tabuleirodoc[game.peca.coord].innerHTML;
                tabuleirodoc[game.peca.coord].innerHTML = '';
                tabuleirodoc[coord].innerHTML = vaux;
                let objvaux = {
                    tipo: 0,
                    cor: 0
                }
                objvaux.tipo = tabuleiro.tipo[game.peca.coord];
                objvaux.cor = tabuleiro.cor[game.peca.coord];
                tabuleiro.tipo[game.peca.coord] = 0;
                tabuleiro.cor[game.peca.coord] = 0;
                tabuleiro.tipo[coord] = objvaux.tipo;
                tabuleiro.cor[coord] = objvaux.cor;

                switch (game.turn) {

                    case 8:
                        game.turn = 16;
                        break;
                    case 16:
                        game.turn = 8;
                        break;
                }
                if (!flag) {
                    //PeacockBass(1);
                }
            }
            this.unhighlight();
        }
        this.whitecontrol = function (tabuleiro) {
            let tabuleirocontrol = [];
            for (let i = 0; i < 64; i++) {
                tabuleirocontrol[i] = false
            }
            let posicontrol = [];
            let k = 0;
            let peca;
            let turn = 8;
            for (let i = 0; i < 64; i++) {
                if (tabuleiro.cor[i] == 8) {
                    if (tabuleiro.tipo[i] == 6) {
                        peca = new pawn();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 1 || tabuleiro.tipo[i] == 7) {
                        peca = new rook();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 2) {
                        peca = new knight();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 3) {
                        peca = new bishop();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 4) {
                        peca = new queen();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 5) {
                        peca = new king();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] != 5)
                        var arrayaux = peca.calc(tabuleiro, i, true, turn);
                    else
                        var arrayaux = peca.calc(tabuleiro, i, true, whiteroque.rr, whiteroque.lr, whiteroque.k, blackroque.rr, blackroque.lr, blackroque.k, turn);
                    if (arrayaux != -1) {

                        for (let j = 0; j < arrayaux.length; j++) {
                            posicontrol[k] = arrayaux[j];
                            k++;
                        }

                    }
                }
            }
            for (let i = 0; i < posicontrol.length; i++) {
                if (!tabuleirocontrol[posicontrol[i]]) {
                    tabuleirocontrol[posicontrol[i]] = true;
                }
            }
            return tabuleirocontrol;
        }
        this.blackcontrol = function (tabuleiro) {
            let tabuleirocontrol = [];
            for (let i = 0; i < 64; i++) {
                tabuleirocontrol[i] = false
            }
            let posicontrol = [];
            let k = 0;
            let peca;
            let turn = 16;
            for (let i = 0; i < 64; i++) {

                if (tabuleiro.cor[i] == 16) {
                    if (tabuleiro.tipo[i] == 6) {
                        peca = new pawn();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 1 || tabuleiro.tipo[i] == 7) {
                        peca = new rook();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 2) {
                        peca = new knight();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 3) {
                        peca = new bishop();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 4) {
                        peca = new queen();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] == 5) {
                        peca = new king();
                        peca.cor = tabuleiro.cor[i];
                        peca.coord = i;
                    }
                    if (tabuleiro.tipo[i] != 5)
                        var arrayaux = peca.calc(tabuleiro, i, true, turn);
                    else
                        var arrayaux = peca.calc(tabuleiro, i, true, whiteroque.rr, whiteroque.lr, whiteroque.k, blackroque.rr, blackroque.lr, blackroque.k, turn);
                    if (arrayaux != -1) {
                        for (let j = 0; j < arrayaux.length; j++) {
                            posicontrol[k] = arrayaux[j];
                            k++;
                        }
                    }
                }
            }
            for (let i = 0; i < posicontrol.length; i++) {
                if (!tabuleirocontrol[posicontrol[i]]) {
                    tabuleirocontrol[posicontrol[i]] = true;
                }
            }

            return tabuleirocontrol;
        }
    }
}
class pawn {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, turn) {
            let posipos = [];
            let i = 0;
            let para;
            if (tabuleiro.cor[posicao] == turn) {
                if (tabuleiro.cor[posicao] == 16) {
                    para = posicao + 8
                    if (tabuleiro.tipo[para] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, para)) {
                            posipos[i] = para;
                            i++;
                        }
                    }
                    para = posicao + 16;
                    if (posicao >= 8 && posicao <= 15 && tabuleiro.tipo[para] == 0 && tabuleiro.tipo[posicao + 8] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, para)) {
                            posipos[i] = para;
                            i++;
                        }
                    }
                    para = posicao + 7
                    if (posicao < 55 && posicao % 8 != 0) {
                        if (tabuleiro.cor[para] == 8) {
                            if (flag || stopforcheck(tabuleiro, posicao, para)) {
                                posipos[i] = para;
                                i++;
                            }
                        }
                    }
                    para = posicao + 9;
                    if (posicao < 55 && (posicao + 1) % 8 != 0) {
                        if (tabuleiro.cor[para] == 8) {
                            if (flag || stopforcheck(tabuleiro, posicao, para)) {
                                posipos[i] = para;
                                i++;
                            }
                        }
                    }
                } else {
                    para = posicao - 8
                    if (tabuleiro.tipo[para] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, para)) {
                            posipos[i] = para;
                            i++;
                        }
                    }
                    para = posicao - 16;
                    if (posicao >= 48 && posicao <= 55 && tabuleiro.tipo[para] == 0 && tabuleiro.tipo[posicao - 8] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, para)) {
                            posipos[i] = para;
                            i++;
                        }
                    }
                    para = posicao - 7
                    if (posicao < 55 && (posicao + 1) % 8 != 0) {
                        if (tabuleiro.cor[para] == 16) {
                            if (flag || stopforcheck(tabuleiro, posicao, para)) {
                                posipos[i] = para;
                                i++;
                            }
                        }
                    }
                    para = posicao - 9;
                    if (posicao < 55 && posicao % 8 != 0) {
                        if (tabuleiro.cor[para] == 16) {
                            if (flag || stopforcheck(tabuleiro, posicao, para)) {
                                posipos[i] = para;
                                i++;
                            }
                        }
                    }
                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}
class rook {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, turn) {
            let posipos = [];
            let j = 0;
            if (tabuleiro.cor[posicao] == turn) {
                //Subindo
                for (let i = posicao - 8; i > -1; i -= 8) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Descendo
                for (let i = posicao + 8; i < 64; i += 8) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Esquerda
                for (let i = posicao - 1; (i + 1) % 8 != 0; i--) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Direita
                for (let i = posicao + 1; i % 8 != 0; i++) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }

                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}
class knight {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, turn) {
            let posipos = [];
            let j = 0;

            if (tabuleiro.cor[posicao] == turn) {
                //L com a base para cima
                let i = posicao - 15;
                if (posicao - 16 > 0) {
                    if ((posicao + 1) % 8 != 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao - 15)) {
                                posipos[j] = posicao - 15;
                                j++;
                            }
                        }
                    }
                    i = posicao - 17;
                    if (posicao % 8 != 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao - 17)) {
                                posipos[j] = posicao - 17;
                                j++;
                            }
                        }
                    }
                }
                //L com a base para a direita
                i = posicao - 6;
                if ((posicao + 2) % 8 != 0 && (posicao + 1) % 8 != 0) {
                    if (posicao - 8 >= 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao - 6)) {
                                posipos[j] = posicao - 6;
                                j++;
                            }
                        }
                    }
                    i = posicao + 10;
                    if (posicao + 8 < 64) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao + 10)) {
                                posipos[j] = posicao + 10;
                                j++;
                            }
                        }
                    }

                }
                //L com a base para a esquerda
                i = posicao - 10;
                if (posicao % 8 != 0 && (posicao - 1) % 8 != 0) {
                    if (posicao - 8 > 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao - 10)) {
                                posipos[j] = posicao - 10;
                                j++;
                            }
                        }
                    }
                    i = posicao + 6;
                    if (posicao + 8 < 64) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao + 6)) {
                                posipos[j] = posicao + 6;
                                j++;
                            }
                        }
                    }
                }
                //L normal
                i = posicao + 17;
                if (posicao + 16 < 64) {
                    if ((posicao + 1) % 8 != 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao + 17)) {
                                posipos[j] = posicao + 17;
                                j++;
                            }
                        }
                    }
                    i = posicao + 15;
                    if (posicao % 8 != 0) {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao] || tabuleiro.tipo[i] == 0) {
                            if (flag || stopforcheck(tabuleiro, posicao, posicao + 15)) {
                                posipos[j] = posicao + 15;
                                j++;
                            }
                        }
                    }
                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}
class bishop {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, turn) {
            let posipos = [];
            let j = 0;
            if (tabuleiro.cor[posicao] == turn) {
                //Diagonal Superior Direita
                for (let i = posicao - 7; i % 8 != 0 && i > 0; i -= 7) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Superior Esquerda
                for (let i = posicao - 9; (i + 1) % 8 != 0 && i > -1; i -= 9) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Inferior Direita
                for (let i = posicao + 9; i % 8 != 0 && i < 64; i += 9) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Inferior Esquerda
                for (let i = posicao + 7; (i + 1) % 8 != 0 && i < 63; i += 7) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                    if (i % 8 == 0) {
                        break;
                    }
                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}
class queen {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, turn) {
            let posipos = [];
            let j = 0;
            if (tabuleiro.cor[posicao] == turn) {
                //Subindo
                for (let i = posicao - 8; i > -1; i -= 8) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Descendo
                for (let i = posicao + 8; i < 64; i += 8) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Esquerda
                for (let i = posicao - 1; (i + 1) % 8 != 0; i--) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }
                }
                //Direita
                for (let i = posicao + 1; i % 8 != 0; i++) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[posicao] == 8) {
                            if (tabuleiro.cor[i] == 16) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                        if (tabuleiro.cor[posicao] == 16) {
                            if (tabuleiro.cor[i] == 8) {
                                if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                    posipos[j] = i;
                                    j++;
                                }
                            }
                            break;
                        }
                    }

                }
                //Diagonal Superior Direita
                for (let i = posicao - 7; i % 8 != 0 && i > 0; i -= 7) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Superior Esquerda
                for (let i = posicao - 9; (i + 1) % 8 != 0 && i > -1; i -= 9) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Inferior Direita
                for (let i = posicao + 9; i % 8 != 0 && i < 64; i += 9) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                }
                //Diagonal Inferior Esquerda
                for (let i = posicao + 7; (i + 1) % 8 != 0 && i < 63; i += 7) {
                    if (tabuleiro.tipo[i] == 0) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    } else {
                        if (tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                            if (flag || stopforcheck(tabuleiro, posicao, i)) {
                                posipos[j] = i;
                                j++;
                            }
                        }
                        break;
                    }
                    if (i % 8 == 0) {
                        break;
                    }
                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}
class king {
    constructor() {
        this.cor;
        this.coord;
        this.calc = function (tabuleiro, posicao, flag, whiteroquerr, whiteroquelr, whiteroquek, blackroquerr, blackroquelr, blackroquek, turn) {
            let posipos = [];
            let j = 0;
            let i = posicao - 7;
            if (tabuleiro.cor[posicao] == turn) {
                //Diagonal Superior direita
                if ((posicao + 1) % 8 != 0 && posicao > 7) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Diagonal Superior esquerda
                i = posicao - 9;
                if (posicao % 8 != 0 && posicao > 7) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Diagonal Inferior direita
                i = posicao + 9;
                if ((posicao + 1) % 8 != 0 && posicao < 56) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Diagonal Inferior esquerda
                i = posicao + 7;
                if (posicao % 8 != 0 && posicao < 56) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Subindo
                i = posicao - 8;
                if (posicao > 7) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Descendo
                i = posicao + 8;
                if (posicao < 56) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Direita
                i = posicao + 1;
                if ((posicao + 1) % 8 != 0) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Esquerda
                i = posicao - 1;
                if (posicao % 8 != 0) {
                    if (tabuleiro.tipo[i] == 0 || tabuleiro.cor[i] != tabuleiro.cor[posicao]) {
                        if (flag || stopforcheck(tabuleiro, posicao, i)) {
                            posipos[j] = i;
                            j++;
                        }
                    }
                }
                //Roque Direito
                if (game.turn == 8) {
                    if (whiteroquerr && whiteroquek && !flag) {
                        let mesa = new Mesa();
                        let tabucalc = mesa.blackcontrol(tabuleiro);
                        let bandeira = true;
                        for (let k = posicao; k < 63 && bandeira; k++) {
                            if (tabucalc[k]) {
                                bandeira = false;
                            }
                            if (posicao != k && tabuleiro.tipo[k] != 0) {
                                bandeira = false;
                            }
                        }
                        if (bandeira) {
                            posipos[j] = posicao + 2;
                            j++;
                        }
                    }
                    if (whiteroquelr && whiteroquek && !flag) {
                        let mesa = new Mesa();
                        let tabucalc = mesa.blackcontrol(tabuleiro)
                        let bandeira = true;
                        for (let k = posicao; k > 56 && bandeira; k--) {
                            if (tabucalc[k]) {
                                bandeira = false;
                            }
                            if (posicao != k && tabuleiro.tipo[k] != 0) {
                                bandeira = false;
                            }
                        }
                        if (bandeira) {
                            posipos[j] = posicao - 2;
                            j++;
                        }
                    }
                } else {
                    if (blackroquerr && blackroquek && !flag) {
                        let mesa = new Mesa();
                        let tabucalc = mesa.whitecontrol(tabuleiro);

                        let bandeira = true;
                        for (let k = posicao; k < 7 && bandeira; k++) {
                            if (tabucalc[k]) {
                                bandeira = false;
                            }
                            if (posicao != k && tabuleiro.tipo[k] != 0) {
                                bandeira = false;
                            }
                        }
                        if (bandeira) {
                            posipos[j] = posicao + 2;
                            j++;
                        }
                    }
                    if (blackroquelr && blackroquek && !flag) {
                        let mesa = new Mesa();
                        let tabucalc = mesa.whitecontrol(tabuleiro)
                        let bandeira = true;
                        for (let k = posicao; k > 0 && bandeira; k--) {
                            if (tabucalc[k]) {
                                bandeira = false;
                            }
                            if (posicao != k && tabuleiro.tipo[k] != 0) {
                                bandeira = false;
                            }
                        }
                        if (bandeira) {
                            posipos[j] = posicao - 2;
                            j++;
                        }
                    }
                }
                return posipos;
            } else {
                return -1;
            }
        }
    }
}

function stopforcheck(tabuleiro, corig, cofin) {
    let tabucalc = {
        tipo: [],
        cor: []
    }
    for (let i = 0; i < 64; i++) {
        tabucalc.tipo[i] = tabuleiro.tipo[i];
        tabucalc.cor[i] = tabuleiro.cor[i];
    }
    let vaux = {
        tipo: 0,
        cor: 0,
    }
    vaux.tipo = tabucalc.tipo[corig];
    vaux.cor = tabucalc.cor[corig];
    tabucalc.tipo[corig] = 0;
    tabucalc.cor[corig] = 0;
    tabucalc.tipo[cofin] = vaux.tipo;
    tabucalc.cor[cofin] = vaux.cor;
    return !chekingcheck(tabucalc, vaux.cor);
}

function chekingcheck(tabuleiro, cor) {
    let mesa = new Mesa();
    if (cor == 8) {
        let areadom = mesa.blackcontrol(tabuleiro);
        let flag = true;
        let coord;
        for (let i = 0; i < 64 && flag; i++) {
            if (tabuleiro.tipo[i] == 5 && tabuleiro.cor[i] == cor) {
                flag = false;
                coord = i;
            }
        }
        return areadom[coord];
    } else {
        let areadom = mesa.whitecontrol(tabuleiro);
        let flag = true;
        let coord;
        for (let i = 0; i < 64 && flag; i++) {
            if (tabuleiro.tipo[i] == 5 && tabuleiro.cor[i] == cor) {
                flag = false;
                coord = i;
            }
        }
        return areadom[coord];
    }
}

function PeacockBass(profundidade) {
    debugger;
    //Mais áreas em controle = + ou - 0.5 pts
    //Captura peão = + ou - 1
    //Captura cavalo = + ou - 3
    //Captura bispo = + ou - 3.5
    //Captura torre = + ou - 5
    //Captura dama = + ou - 9
    //Cheque mate = + ou - 10000 
    //Afogamento = -5000
    const moveList = {
        pts: [],
        de: [],
        para: [],
        espaco: -1
    }
    let mesa = new Mesa();
    let tabuleiro = mesa.maketable();

    let IroqueB = {
        lr: 0,
        rr: 0,
        k: 0
    }
    let IroqueP = {
        lr: 0,
        rr: 0,
        k: 0
    }
    for (let i = 0; i < 64; i++) {
        if (tabuleiro.cor[i] == 16) {
            IroqueB.lr = whiteroque.lr;
            IroqueB.rr = whiteroque.rr;
            IroqueB.k = whiteroque.k;

            IroqueP.lr = blackroque.lr;
            IroqueP.rr = blackroque.rr;
            IroqueP.k = blackroque.k;

            foresight(profundidade, tabuleiro, i, true, 0, moveList, IroqueB.lr, IroqueB.rr, IroqueB.k, IroqueP.lr, IroqueP.rr, IroqueP.k);
        }
    }
    let melhorMovimento = {
        pts: -20000,
        de: 0,
        para: 0
    }
    for (let i = 0; i < moveList.espaco + 1; i++) {

        if (moveList.pts[i] > melhorMovimento.pts) {
            melhorMovimento.pts = moveList.pts[i];
            melhorMovimento.de = moveList.de[i];
            melhorMovimento.para = moveList.para[i];
        }
    }
    debugger;
    game.peca.coord = melhorMovimento.de;
    mesa.move(tabuleiro, melhorMovimento.para, true);
}

function foresight(repeticao, tabuleiro, space, flag, points, moveList, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk) {
    debugger;
    let peca;
    if (tabuleiro.tipo[space] == 6) {
        peca = new pawn();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] == 1 || tabuleiro.tipo[space] == 7) {
        peca = new rook();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] == 2) {
        peca = new knight();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] == 3) {
        peca = new bishop();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] == 4) {
        peca = new queen();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] == 5) {
        peca = new king();
        peca.cor = tabuleiro.cor[space];
    }
    if (tabuleiro.tipo[space] != 5)
        var posipos = peca.calc(tabuleiro, space, false, tabuleiro.cor[space]);
    else
        var posipos = peca.calc(tabuleiro, space, false, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk, tabuleiro.cor[space]);

    let tabucalc = {
        cor: [],
        tipo: []
    };
    for (let i = 0; i < 64; i++) {
        tabucalc.cor[i] = tabuleiro.cor[i];
        tabucalc.tipo[i] = tabuleiro.tipo[i];
    }
    debugger;
    for (let i = 0; i < posipos.length; i++) {
        if (flag) {
            let comparacao = {
                pts: 0,
                de: space,
                para: posipos[i]
            }
            points = comparacao;
            moveList.espaco++;
        }
        let captura = {
            tipo: 0,
            cor: 0
        }
        let teste = ImaginaryMove(space, posipos[i], tabuleiro, tabucalc, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk, captura);
        let end = pontuar(points, tabucalc, captura);
        if (!end) {
            for (let j = 0; j < 64; j++) {
                if (tabucalc.cor[j] == 8) {
                    let peca0;
                    if (tabucalc.tipo[j] == 6) {
                        peca0 = new pawn();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] == 1 || tabucalc.tipo[j] == 7) {
                        peca0 = new rook();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] == 2) {
                        peca0 = new knight();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] == 3) {
                        peca0 = new bishop();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] == 4) {
                        peca0 = new queen();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] == 5) {
                        peca0 = new king();
                        peca0.cor = tabucalc.cor[j];
                    }
                    if (tabucalc.tipo[j] != 5)
                        var posips = peca0.calc(tabucalc, j, false, tabucalc.cor[j]);
                    else
                        var posips = peca0.calc(tabucalc, j, false, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk, tabucalc.cor[j]);

                    let tabucalc0 = {
                        cor: [],
                        tipo: []
                    };
                    for (let k = 0; k < 64; k++) {
                        tabucalc0.cor[k] = tabucalc.cor[k];
                        tabucalc0.tipo[k] = tabucalc.tipo[k];
                    }
                    for (let k = 0; k < posips.length; k++) {
                        let captura0 = {
                            tipo: 0,
                            cor: 0
                        }
                        let roques = ImaginaryMove(j, posips[k], tabucalc, tabucalc0, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk, captura0);
                        let end0 = pontuar(points, tabucalc0, captura0);
                        if (!end0 && repeticao > 0) {
                            foresight(repeticao, tabucalc0, posips[k], false, points, moveList, roques[0], roques[1], roques[2], roques[3], roques[4], roques[5]);
                        }
                    }
                }
            }
        }
    }
    if (repeticao == 0) {
        moveList.pts[moveList.espaco] = points.pts;
        moveList.de[moveList.espaco] = points.de;
        moveList.para[moveList.espaco] = points.para;
    }
}

function ImaginaryMove(from, to, tabuleiro, tabucalc, wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk, captura) {
    let vaux = {
        tipo: 0,
        cor: 0,
    }
    for (let i = 0; i < 64; i++) {
        tabucalc.cor[i] = tabuleiro.cor[i];
        tabucalc.tipo[i] = tabuleiro.tipo[i];
    }
    if (tabucalc.tipo[to] == 7) {
        if (tabucalc.cor[to] == 8) wroqrr = false;
        if (tabucalc.cor[to] == 16) broqrr = false;
    }
    if (tabucalc.tipo[to] == 1) {
        if (tabucalc.cor[to] == 8) wroqlr = false;
        if (tabucalc.cor[to] == 16) broqlr = false;
    }
    if (tabucalc.tipo[from] == 7) {
        if (tabucalc.cor[from] == 8) wroqrr = false;
        if (tabucalc.cor[from] == 16) broqrr = false;
    }
    if (tabucalc.tipo[from] == 1) {
        if (tabucalc.cor[from] == 8) wroqlr = false;
        if (tabucalc.cor[from] == 16) broqlr = false;
    }
    if (tabucalc.tipo[from] == 5) {
        if (tabucalc.cor[from] == 8) wroqk = false;
        if (tabucalc.cor[from] == 16) broqk = false;
    }
    captura.tipo = tabucalc.tipo[to];
    captura.cor = tabucalc.tipo[to];
    //Roque direito
    if (tabucalc.tipo[from] == 5 && to == from + 2 && tabucalc.cor[from] == 16) {
        tabucalc.tipo[to - 1] = 7;
        tabucalc.tipo[to + 1] = 0;
        tabucalc.cor[to - 1] = 16;
        tabucalc.cor[to + 1] = 0;
    }
    if (tabucalc.tipo[from] == 5 && to == from + 2 && tabucalc.cor[from] == 8) {
        tabucalc.tipo[to - 1] = 7;
        tabucalc.tipo[to + 1] = 0;
        tabucalc.cor[to - 1] = 8;
        tabucalc.cor[to + 1] = 0;
    }
    //Roque esquerdo
    if (tabucalc.tipo[from] == 5 && to == from - 2 && tabucalc.cor[from] == 16) {
        tabucalc.tipo[to + 1] = 1;
        tabucalc.tipo[to - 2] = 0;
        tabucalc.cor[to + 1] = 16;
        tabucalc.cor[to - 2] = 0;
    }
    if (tabucalc.tipo[from] == 5 && to == from - 2 && tabucalc.cor[from] == 8) {
        tabucalc.tipo[to + 1] = 1;
        tabucalc.tipo[to - 2] = 0;
        tabucalc.cor[to + 1] = 8;
        tabucalc.cor[to - 2] = 0;
    }
    vaux.tipo = tabucalc.tipo[from];
    vaux.cor = tabucalc.cor[from];
    tabucalc.tipo[from] = 0;
    tabucalc.cor[from] = 0;
    tabucalc.tipo[to] = vaux.tipo;
    tabucalc.cor[to] = vaux.cor;
    return [wroqlr, wroqrr, wroqk, broqlr, broqrr, broqk];
}

function pontuar(pontos, tabu1, captura) {
    let mesa = new Mesa();
    //Comparação de Areas dominadas
    let ABcontrol = mesa.blackcontrol(tabu1);
    let AWcontrol = mesa.whitecontrol(tabu1);
    let Bcontrol = 0;
    let Wcontrol = 0;

    for (let i = 0; i < 64; i++) {
        if (ABcontrol[i])
            Bcontrol++;
        if (AWcontrol[i])
            Wcontrol++;
    }

    if (Bcontrol > Wcontrol)
        pontos.pts += 0.5 * Wcontrol;
    if (Bcontrol < Wcontrol)
        pontos.pts -= 0.5 * Bcontrol;
    //Quem levou mate/afogamento
    let whiteCheck = false;
    let blackCheck = false;
    for (let i = 0; i < 64; i++) {
        if (tabu1.tipo[i] == 5 && tabu1.cor[i] == 8 && ABcontrol[i])
            whiteCheck = true;
        else
            if (tabu1.tipo[i] == 5 && AWcontrol[i])
                blackCheck = true;
    }

    if (Bcontrol == 0 && blackCheck) {
        pontos.pts -= 10000
        return true;
    } else {
        if (Bcontrol == 0) {
            pontos.pts -= 5000
            return true;
        }
    }
    if (Wcontrol == 0 && whiteCheck) {
        pontos.pts += 10000
        return true;
    } else {
        if (Wcontrol == 0) {
            pontos.pts -= 5000
            return true;
        }
    }
    //Captura de peças
    if (captura.cor == 16) {
        switch (captura.tipo) {
            case 1:
                pontos.pts -= 5
                break;
            case 2:
                pontos.pts -= 3;
                break;
            case 3:
                pontos.pts -= 3.5;
                break;
            case 4:
                pontos.pts -= 9;
                break;
            case 6:
                pontos.pts -= 2;
                break;
        }
    } else {
        switch (captura.tipo) {
            case 1:
                pontos.pts += 5
                break;
            case 2:
                pontos.pts += 3;
                break;
            case 3:
                pontos.pts += 3.5;
                break;
            case 4:
                pontos.pts += 9;
                break;
            case 6:

                pontos.pts += 2;
                break;
        }
    }
    return false;
}

