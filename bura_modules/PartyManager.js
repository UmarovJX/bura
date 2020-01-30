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
            gameId: partyId
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
            return [{ target: player.id, event: 'gamewait', data: { name: name } }]
        }
    }

    static removePlayer(client) {
        const id = client.bura.id;
        const party = parties[client.bura.gameId];
        party.players = party.players.filter(p => p.id !== id)
        if (party.players.length) delete parties[client.bura.gameId];
        return party.players
    }

    static moveCards() { }
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