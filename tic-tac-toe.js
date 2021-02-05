let x = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
let o = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
let currentPlayer = x;
let turnNumber = 1;
let gameStatus = null;
window.addEventListener("DOMContentLoaded", event =>{


    let board = document.getElementById('tic-tac-toe-board');

    board.addEventListener('click', event => {

        let clicked = event.target.id;

        let img = document.createElement('img');
        img.src = currentPlayer;
        let target = document.getElementById(clicked);
        target.appendChild(img);
        turnNumber++;
        //get the value of each square
        if (turnNumber > 9) {
            gameStatus = 'Tie';
            h1 = document.getElementById('game-status');
            h1.innerText = 'Tie game!'
        }
        //create an array of winnning combinations
        //assign clicks div's an extra class of current player
        //iterate the array and compare current moves to winning array;
        //if true; game status === 'win!'
        //define winning game status to h1 tag;
        if (currentPlayer === x) {
            currentPlayer = o;

        }
        else if (currentPlayer === o) {
            currentPlayer = x;
        }

    })
    //build the 'new game' and 'give up' button functionality
    //add click event listeners to both buttons;
    //define actions;
    


});
