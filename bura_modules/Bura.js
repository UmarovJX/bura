var Player = require('./Player');
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
        let q = [6, 7, 8, 9, "J", "Q", "K", 10, "A"];

        if (this.currentDeck.length === 0) return true;

        cards = this.sortCards(cards);
        this.currentDeck = this.sortCards(this.currentDeck);

        let beaten = true;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i][1] === this.currentDeck[i][1]) {
                if (q.indexOf(cards[i][0]) < q.indexOf(this.currentDeck[i][0])) {
                    beaten = false;
                }
            }
            else {
                if (cards[i][1] !== this.koz[1]) {
                    beaten = false;
                }
            }
        }
        return beaten;
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
    moveIsValid(name, sentDeck) {
        if (!Array.isArray(sentDeck)) return false;
        if (sentDeck.length === 0) return false;
        if (this.players[this.turn].name !== name) return false;
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