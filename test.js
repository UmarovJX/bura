var Bura = require('Bura')
    , Player = require('Player');
var qqq=new Date().getTime();

var game = new Bura();
game.players.push(new Player);
game.players.push(new Player);
game.players.push(new Player);
game.players.push(new Player);
game.filldecks();
game.players.forEach(function(a){
    console.log(a.currentCards);
})
console.log(game.deck);
console.log(new Date().getTime()-qqq);