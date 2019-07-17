module.exports = class Player {
    constructor(name, turnNumber) {
        this.name = name;
        this.score = 0;
        this.currentCards = [];
        this.takenCards = [];

    }

    removeCards(deck) {
        deck.forEach(element => {
            let index = this.currentCards.findIndex((el) => {
                return el[0] === element[0] && el[1] === element[1]
            })
            this.currentCards.splice(index, 1);
        });
    }


}
