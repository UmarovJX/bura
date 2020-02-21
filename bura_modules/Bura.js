const Player = require('./Player');
const cardSorter = require('./cardSorter');
const cardGT = require('./cardGT');

module.exports = class Bura {
    constructor() {
        this.deck = this.shuffle(this.fullDeck());
        this.koz = this.deck[1];
        this.beatenDeck = [];//карты битые в этом круге
        this.currentDeck = [];//карты которые надо бить в этом круге
        this.players = [];
        this.turn;
        this.firstPlayer;//игрок ходивший первым в этом круге
        this.winningPlayer;// игрок забирающий карты в этом круге
    }

    deckIsBeaten(cards) {
        if (this.currentDeck.length === 0) return true;
        const gt = cardGT(this.koz);
        if (cards.length >= 2) {
            cards = cardSorter(this.koz, cards);
            this.currentDeck = cardSorter(this.koz, this.currentDeck);
        }
        let beaten = true;
        cards.forEach((e, i) => {
            if (gt(this.currentDeck[i], e)) beaten = false;
        })

        return beaten;
    }

    processMove(deck) {
        const player = this.players[this.turn];
        player.removeCards(deck);
        let beaten = false,
            round = false;
        //Обработка бьющего хода
        if (this.deckIsBeaten(deck)) {
            this.moveCurrentDeckToBeaten();
            this.changeCurrentDeck(deck);
            this.setWinningPlayer(); beaten = true;
        } else { this.addCardsToBeaten(deck); }
        // обработка конца круга
        if (this.roundIsOver()) {
            this.moveBeatenCardsToWInner();
            this.fillDecks();
            this.startNewRound();
            round = true;
        } else {
            this.nextPlayer();
        }
        return { beaten, round, gameOver: this.beatenDeck.length === 36, name: player.name, win: this.players[this.winningPlayer].name };
    }



    startGame() {
        this.fillDecks();
        this.firstPlayer = this.turn = Math.floor(Math.random() * this.players.length);
    }


    startNewRound() {
        this.turn = this.firstPlayer = this.winningPlayer;
        this.currentDeck = [];
        this.beatenDeck = [];
    }




    //ГОТОВЫЕ ФУНКЦИИ
    moveCurrentDeckToBeaten() {
        this.beatenDeck.push(...this.currentDeck);
    }
    addCardsToBeaten(deck) {
        this.beatenDeck.push(...deck);
    }
    changeCurrentDeck(cards) {
        this.currentDeck = [...cards];
    }

    moveBeatenCardsToWInner() {
        this.players[this.winningPlayer].takenCards.push(...this.beatenDeck);
        this.players[this.winningPlayer].takenCards.push(...this.currentDeck);
    }
    fullDeck() {
        return [
            ['6', '&spades;'],
            ['7', '&spades;'],
            ['8', '&spades;'],
            ['9', '&spades;'],
            ['J', '&spades;'],
            ['Q', '&spades;'],
            ['K', '&spades;'],
            ['10', '&spades;'],
            ['A', '&spades;'],
            ['6', '&clubs;'],
            ['7', '&clubs;'],
            ['8', '&clubs;'],
            ['9', '&clubs;'],
            ['J', '&clubs;'],
            ['Q', '&clubs;'],
            ['K', '&clubs;'],
            ['10', '&clubs;'],
            ['A', '&clubs;'],
            ['6', '&hearts;'],
            ['7', '&hearts;'],
            ['8', '&hearts;'],
            ['9', '&hearts;'],
            ['J', '&hearts;'],
            ['Q', '&hearts;'],
            ['K', '&hearts;'],
            ['10', '&hearts;'],
            ['A', '&hearts;'],
            ['6', '&diams;'],
            ['7', '&diams;'],
            ['8', '&diams;'],
            ['9', '&diams;'],
            ['J', '&diams;'],
            ['Q', '&diams;'],
            ['K', '&diams;'],
            ['10', '&diams;'],
            ['A', '&diams;']
        ];
    }
    shuffle(arr) {
        var j, temp;
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    fillDecks() {
        let g = this;
        while (g.players[0].currentCards.length < 4 && g.deck.length > 0) {
            g.players.forEach(function (pl) {
                pl.currentCards.push(g.deck.pop());
            })
        }
    }
    changeTurn() {
        if (!this.turn && this.turn !== 0 || this.turn === this.players.length - 1) return this.turn = 0;
        if (this.turn < this.players.length - 1) return ++this.turn;
    }
    roundIsOver() {
        let over = false;
        if (this.firstPlayer === 0) {
            if (this.turn === this.players.length - 1) over = true;
        } else {
            if (this.turn === this.firstPlayer - 1) over = true;
        }

        return over;
    }
    moveIsValid(id, sentDeck) {
        if (!Array.isArray(sentDeck)) return false;
        if (sentDeck.length === 0) return false;
        if (this.players[this.turn].id !== id) return false;
        if (this.currentDeck.length !== 0 && sentDeck.length !== this.currentDeck.length) return false;
        if (this.currentDeck.length === 0) {
            return sentDeck.reduce(function (boole, element, index, array) {
                return boole && (element[1] === array[0][1]);
            }, true);
        }
        return true;
    }
    nextPlayer() {
        this.changeTurn();
    }
    setWinningPlayer() {
        this.winningPlayer = this.turn;
    }
    sortCards(deck) {
        let q = [6, 7, 8, 9, "J", "Q", "K", 10, "A"];
        for (let i = 0, endI = deck.length - 1; i < endI; i++) {
            let swap = false;
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                if ((deck[j][1] === deck[j + 1][1] && q.indexOf(deck[j][0]) > q.indexOf(deck[j + 1][0])) || (deck[j][1] !== deck[j + 1][1] && deck[j][1] === this.koz[1])) {
                    [deck[j], deck[j + 1]] = [deck[j + 1], deck[j]];
                    swap = true;
                }
            }
            if (!swap) break;
        }
        return deck
    }
}