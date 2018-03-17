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

var scores, roundScores, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random numbers
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2.  display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        if (dice1 !== 1 && dice2 !== 1) {
            roundScores+= dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // next player
            nextPlayer();
        }

        if (dice === 6 && lastDice === 6) {
            // Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = '0';
            nextPlayer()
        }

        // update the round score IF the rolled number was NOT a 1
         else if (dice !== 1 && dice1 !== 1 ) {
            roundScores+= dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // next player
            nextPlayer();
        }
        lastDice = dice;

    }


});
document.querySelector('.btn-hold').addEventListener('click', function () {

    var inputScore = document.querySelector(".final-score").value;
    var winningScore;

    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScores;


        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (inputScore) {
            winningScore = inputScore;

        } else {
            winningScore = 100;
        }


        // check if player won the game
        if (scores[activePlayer] >= winningScore) {

            document.querySelector('#name-' + activePlayer).textContent = 'winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// new game button
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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

