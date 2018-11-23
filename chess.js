const reg = /((?:(?:O-O)(?:-O)?)?)(?:(^[KQNRB]?)([a-h]?)((?:\d(?=.{3,}))?)(x?)([a-h])(\d)([QNRB]?))/g;

class Chess {
    constructor(games) {
        this.maxGames = games;
        this.gamelist = [];
        this.challenges = [];
    }
    challenge(password, id1, id2) {
        for (let i = 0; i < this.challenges.length; i++) {
            if (id1 === this.challenges[i].player1) {
                return -2;
            }
        }
        if (this.challenges.length < this.maxGames) {
            if (id2) {
                this.challenges.push({
                    player1: id1,
                    player2: id2,
                    open: false,
                    password: false
                });
            }
            else if (password) {
                this.challenges.push({
                    player1: id1,
                    open: false,
                    password: password
                });
            }
            else {
                this.challenges.push({
                    player1: id1,
                    open: true,
                    password: false
                });
            }
            return this.challenges.length - 1;
        }
        else {
            return -1;
        }
    }
    accept(id, password, elnum) {
        if (this.challenges[elnum].player2 === id || this.challenges[elnum].password === password || this.challenges[elnum].open) {
            let c = this.challenges.splice(elnum, 1);
            this.newGame(c.player1, id);
            return true;
        }
        else return false;
    }
    decline(id, elnum) {
        if (this.challenges[elnum].player2 === id) {
            this.challenges.splice(elnum, 1);
            return true;
        }
        else return false;
    }
    newGame(member1, member2) {
        if (this.gamelist.length < this.maxGames) {
            let game = {
                board: [
                    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
                    ["b", "b", "b", "b", "b", "b", "b", "b"],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["w", "w", "w", "w", "w", "w", "w", "w"],
                    ["wR", "wN", "wB", "wQ", "wK", "wB", "wK", "wR"]
                ],
                move: "w"
            };
            game.white = (Math.random() > 0.5) ? member1 : member2;
            game.black = (game.white === member2) ? member1 : member2;
            this.gamelist.push(game);
        }
    }
    fileAndRank(file, rank) {
        rank = +rank;
        if (rank > 7) rank = 7;
        if (rank < 0) rank = 0;
        if (file > 7) file = 7;
        if (file < 0) file = 0;
        return ['abcdefgh'.substring(file, file + 1), 8 - rank];

    }
    derank(rank) {
        return rank - 1;
    }
    defile(file) {
        return 'abcdefgh'.indexOf(file);
    }
    getPiece(color, piece, srank, sfile, capture, rank, file) {
        const location = [],
            cpiece = color + piece,
            a = [];
        switch (piece) {
            case "K":
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (this.board[i][j] === cpiece || this.board[i][j] === cpiece + "m") location = this.fileAndRank(j, i);
                    }
                }
                break;
            case "Q":
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (this.board[i][j] === cpiece) {
                            a.push(this.fileAndRank(j, i));
                        }
                    }
                }
                if (a.length === 1) location = a[0];
                else if (a.length > 1) {
                    for (let i = 0; i < a.length; i++) {
                        if ((srank || sfile) && ((a[i][0] === sfile && ((a[i][1] === srank) || !srank)) || (!sfile && a[i][1] === srank))) {
                            location = a[i];
                            break;
                        }
                        else if (file && rank) {
                            let dr = this.derank(a[i][1]),
                                df = this.defile(a[i][0]);
                            for (let j = dr - 1; j >= dr - df; j++) {
                                let d = j - dr + df;
                                if (j < 0 || j > 7 || d < 0 || d > 7) continue;
                                else if (this.fileAndRank(d, j) === [file, rank]) {
                                    location = a[i];
                                    break;
                                }
                            }
                            for (let j = dr; j < dr + df; j++) {
                                let d = dr + df - j;
                                if (j < 0 || j > 7 || d < 0 || d > 7) continue;
                                else if (this.fileAndRank(d, j) === [file, rank]) {
                                    location = a[i];
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            case "N":
            case "B":
            case "R":
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (this.board[i][j] === cpiece) {
                            a.push(this.fileAndRank(j, i));
                        }
                    }
                }
                if (a.length === 1) location = a[0];
                else if (a.length > 1) {
                    for (let i = 0; i < a.length; i++) {
                        if ((a[i][0] === sfile && ((a[i][1] === srank) || !srank)) || (!sfile && a[i][1] === srank)) {
                            location = a[i];
                            break;
                        }
                    }
                }
                break;
        }
        return location;
    }
    move(color, input) {
        const [, castle, piece, srank, sfile, capture, rank, file, promote] = reg.exec("Kg4");
        if (castle) {
            switch (color) {
                case 'w':
                    if (this.board[7][4] === "wK") {

                    }
            }
        }
    }
}

module.exports = Chess;
