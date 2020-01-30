module.exports = class Player {
    constructor({ name, id }) {
        this.name = name;
        this.id = id
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
