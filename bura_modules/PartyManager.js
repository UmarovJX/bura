const { v4: genId } = require('uuid'),
    Bura = require('./Bura'),
    Player = require('./Player');
const parties = {};
let lastParty = null;
module.exports = class PartyManager {

    static addPlayer(name, client) {
        const player = {
            name: name,
            id: genId(),
            points: 0,
            points: 0
        };
        const partyId = getParty();
        const party = parties[partyId];
        party.players ? party.players.push(player) : party.players = [player];

        client.bura = {
            id: player.id,
            partyId: partyId
        }
        if (party.players.length === 2) {
            lastParty = null;
            const game = party.game = new Bura();
            party.players.forEach(e => game.players.push(new Player(e)))
            game.startGame();
            const data = [];
            game.players.forEach((el, i) => {
                data.push({
                    target: el.id,
                    event: 'gamestart',
                    data: {
                        name: el.name,
                        turn: game.turn === i,
                        cards: game.players[i].currentCards,
                        enemy: game.players[1 - i].name,
                        main: game.koz
                    }
                })
            })
            return data;
        } else {
            return [{ target: player.id, event: 'game-wait', data: { name: name } }]
        }
    }

    static removePlayer(client) {
        const id = client.bura.id;
        const party = parties[client.bura.partyId];
        party.players = party.players.filter(p => p.id !== id)
        if (party.players.length) delete parties[client.bura.partyId];
        return party.players
    }

    static processMove({ deck, player }) {
        if (!(player && parties[player.partyId])) return [];

        const game = parties[player.partyId].game;
        const result = [];

        if (game.moveIsValid(player.id, deck)) {
            const proc = game.processMove(deck);
            game.players.forEach((el, i) => {
                result.push({
                    target: el.id,
                    event: 'player-moved',
                    data: {
                        name: el.name,
                        movedCards: deck,
                        beaten: proc.beaten,
                        round: proc.round,
                        cards: el.currentCards,
                        turn: game.turn === i,
                        roundWInner: game.players[game.winningPlayer].name,
                        gameOver: proc.gameOver
                    }
                })
            })


        } else { return [{ targer: player.id, event: 'invalid-move', data: void 0 }] }
    }
}



function getParty() {
    if (lastParty) {
        return lastParty;
    } else {
        lastParty = genId();
        parties[lastParty] = {};
        return lastParty;
    }
}