/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random numbers
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2.  display the result
         document.getElementById('.dice-1').style.display = 'block';
         document.getElementById('.dice-2').style.display = 'block';
         document.getElementById('.dice-1').src = 'dice-' + dice + '.png';
         document.getElementById('.dice-2').src = 'dice-' + dice2 + '.png';

        // update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice1 !== 1) {
            roundScores+= dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScores;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            // next player
            nextPlayer();
        }
    }
});

// next player
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}

// new game button
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}

/*
    Your 3 challenges
    change the game to follow these rules
    1. A player looses his enter score when he rolls two 6 in a row. After that, it's the next player's turn.
    (Hint: Always save the previous dice roll in a separate variable)
    2. Add an input field to the HTML where players can set the winning score, so that they can change the
    predefined score of 100. (Hint: you can read that value with the .value property in Javascript. this is a
    good opportunity to use google to figure this out :)
    43. Add another dice to the game, so that there are two dices now. the player looses his current score
    when one of them is a 1. (Hint: you will need css to position the second dice, so take a look at the CSS code
    for the first one.)
 */

