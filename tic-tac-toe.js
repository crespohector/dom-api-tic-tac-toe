window.addEventListener("DOMContentLoaded", event =>{

    let x = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
    let o = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
    let currentPlayer = x;
    let turnNumber = 1;
    let gameStatus = null;
    let xArray = [];
    let oArray = [];
    let h1 = document.getElementById('game-status');
    let newGameButton = document.querySelector('.actions button');


    let board = document.getElementById('tic-tac-toe-board');
    //create an array of winnning combinations
    const winningArrays = [
        [document.querySelector('[id*="0"]').id, document.querySelector('[id*="1"]').id, document.querySelector('[id*="2"]').id],
        [document.querySelector('[id*="3"]').id, document.querySelector('[id*="4"]').id, document.querySelector('[id*="5"]').id],
        [document.querySelector('[id*="6"]').id, document.querySelector('[id*="7"]').id, document.querySelector('[id*="8"]').id],
        [document.querySelector('[id*="1"]').id, document.querySelector('[id*="4"]').id, document.querySelector('[id*="7"]').id],
        [document.querySelector('[id*="0"]').id, document.querySelector('[id*="3"]').id, document.querySelector('[id*="6"]').id],
        [document.querySelector('[id*="0"]').id, document.querySelector('[id*="4"]').id, document.querySelector('[id*="8"]').id],
        [document.querySelector('[id*="2"]').id, document.querySelector('[id*="5"]').id, document.querySelector('[id*="8"]').id],
        [document.querySelector('[id*="2"]').id, document.querySelector('[id*="4"]').id, document.querySelector('[id*="6"]').id]
    ];
    
    board.addEventListener('click', event => {
        if (gameStatus !== 'won' || gamesStatus !== 'tie' || gamesStatus !== null) {
            //diable new game button
            //grab the new game button
            newGameButton.disabled = true;
        } else {
            newGameButton.disabled = false;
        }
        
        let clicked = event.target.id;
        //disable clicks after game is won
        if (gameStatus === 'won') {
            return;
        }
        let img = document.createElement('img');
        img.src = currentPlayer;
        let target = document.getElementById(clicked);
        target.appendChild(img);
        //pushes moves to player array
        if(currentPlayer === x) {
            xArray.push(clicked);
        } else {    
            oArray.push(clicked);
        }
        turnNumber++;

        //iterate the array and compare current moves to winning array;
        for (i = 0; i < winningArrays.length; i++) {
            let subArr = winningArrays[i];
            let checker = (playerScore, requirements) => requirements.every(el => playerScore.includes(el));
            //if true; game status === 'win!'
            if(checker(xArray, subArr)) {
                gameStatus = 'won';
                h1.innerText = 'X WINS!'
            } else if (checker(oArray, subArr)) {
                oWins = true;
                h1.innerText = 'O WINS!'
            }
        }

        if (turnNumber > 9) {
            gameStatus = 'Tie';
            h1.innerText = 'Tie game!'
        }
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
    //define button actions;



});
