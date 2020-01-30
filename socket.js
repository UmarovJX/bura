
const PartyManager = require('./bura_modules/PartyManager');
const sockets = {};


module.exports = function (io) {
    io.on('connection', function (client) {
        client.on('addMe', function (name) {
            if (!client.bura) {
                const data = PartyManager.addPlayer(name, client);
                sockets[client.bura.id] = client;
                data.forEach(e => {
                    sockets[e.target].emit(e.event, e.data)
                })
            }
        });

        client.on('disconnect', function () {
            if (!client.bura) return;
            const playersInGame = PartyManager.removePlayer(client);
            delete sockets[client.bura.id];
            playersInGame.forEach(player => {
                sockets[player.id].emit('game-aborted', { purpose: 'partner disconnected' });
                delete sockets[player.id].bura;
                delete sockets[player.id];
            });
        })

        client.on('move', function () { })
    })
}
// module.exports = function (io) {
//     io.sockets.on('connection', function (socket) {
//         //---connecting to server
//         socket.on('addMe', function (userName) {
//             if (!(userName in userNames)) {
//                 socket.userName = userName;
//                 userNames[userName] = socket.id;
//                 socket.game = getGame();
//                 let game = games[socket.game];
//                 game.players.push(new Player(userName));

//                 if (game.players.length === 2) {
//                     game.startGame();
//                     game.players.forEach(element => {
//                         if (element.name === game.players[game.turn].name) {
//                             io.sockets.sockets[userNames[element.name]].emit('gamestart', { "name": element.name, "turn": true, "cards": element.currentCards, "enemy": game.players[1 - game.turn].name, "main": game.deck[1] });
//                         } else {
//                             io.sockets.sockets[userNames[element.name]].emit('gamestart', { "name": element.name, "turn": false, "cards": element.currentCards, "enemy": game.players[game.turn].name, "main": game.koz });
//                         }
//                     });
//                 } else {
//                     game.players.forEach(element => {
//                         io.sockets.sockets[userNames[element.name]].emit('gamewait', { "name": element.name });
//                     });
//                 }
//             } else {
//                 socket.emit("invalidName", undefined);
//             }
//         });

//         //processing move
//         socket.on('move', function (data) {
//             let game = games[socket.game];
//             const cards = data.sentCards;
//             if (game.moveIsValid(socket.userName, cards)) {
//                 let player = game.players[game.turn];
//                 player.removeCards(cards);

//                 let beaten = false;
//                 let round = false;
//                 //Обработка бьющего хода
//                 if (game.deckIsBeaten(cards)) {
//                     game.moveCurrentDeckToBeaten();
//                     game.changeCurrentDeck(cards);
//                     game.setWinningPlayer(); beaten = true;
//                 } else {
//                     game.addCardsToBeaten(cards);
//                 }
//                 // обработка конца круга
//                 if (game.roundIsOver()) {
//                     game.moveBeatenCardsToWInner();
//                     game.fillDecks();
//                     game.startNewRound();
//                     round = true;
//                 } else {
//                     game.nextPlayer();
//                 }
//                 //socket.emit('moveProcessed',{});
//                 game.players.forEach((element, index) => {
//                     // if (element.name !== player.name) 
//                     {
//                         io.sockets.sockets[userNames[element.name]].emit('playerMoved', {

//                             "name": player.name,
//                             "movedCards": cards,
//                             "beaten": beaten,

//                             "cards": element.currentCards,

//                             "turn": game.turn === index,
//                             "round": round,
//                             "roundWinner": game.players[game.winningPlayer].name,
//                             "gameOver": false
//                         })
//                     }
//                 })


//             } else {
//                 socket.emit("invalidMove");
//             }


//         });



//     });
// }

