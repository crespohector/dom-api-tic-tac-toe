window.addEventListener("DOMContentLoaded", event =>{

    let x = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
    let o = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
    let currentPlayer = x;
    let turnNumber = 1;
    let gameStatus = null;
    let xArray = [];
    let oArray = [];
    let h1 = document.getElementById('game-status');
    let buttons = document.querySelectorAll('button');
    let newGameButton = buttons[0];
    let giveUpButton = buttons[1];
    let board = document.getElementById('tic-tac-toe-board');
    let squares = Array.from(board.children);
    console.log(squares);
    giveUpButton.disabled = true;

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

    function reLoad() {
        xArray = localStorage.getItem('xArray');
        oArray = localStorage.getItem('oArray');
        
        //scans arrays to find matches  
        //loop through xArray and oArray
        function repopulator(array) {
            //take matches array and populate with imgs as needed.
            let newArray = array.split(',');
            //if array.includes a square's id, populate with that character's icon.
                        
            let img = document.createElement('img');
        }
        repopulator(xArray);
        repopulator(oArray);
    
    }
    reLoad();

    function reset () {
        xArray = [];
        oArray = [];
        let parent = document.getElementById("tic-tac-toe-board");
        let children = parent.childNodes;
        children.forEach(div => div.innerHTML = '');
        gameStatus = 'active';
        turnNumber = 1;
        h1.innerText = '';
        newGameButton.disabled = true;
        giveUpButton.disabled = false;
    };
    
    //add click event listeners to both buttons;
    //define button actions;
    newGameButton.addEventListener('click', event => {
        //newgame clears localstorage
        reset();
    })
    giveUpButton.addEventListener('click', event => {
        if(currentPlayer === o) {
            h1.innerHTML = 'X WINS!';
        } else {
            h1.innerHTML = 'O WINS!';
        }
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
        //not current player = winner;
        //game status === won
    });
    board.addEventListener('click', event => {

        let clicked = event.target.id;
        //disable clicks after game is won
        if (gameStatus === 'won' || gameStatus === null) {
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

        //save oArray and xArray as key/value pairs in localstorage
        localStorage.setItem('xArray', xArray);
        localStorage.setItem('oArray', oArray);

        //iterate the array and compare current moves to winning array;
        for (i = 0; i < winningArrays.length; i++) {
            let subArr = winningArrays[i];
            let checker = (playerScore, requirements) => requirements.every(el => playerScore.includes(el));
            //if true; game status === 'win!'
            if(checker(xArray, subArr)) {
                gameStatus = 'won';
                h1.innerText = 'X WINS!'
            } else if (checker(oArray, subArr)) {
                gameStatus = 'won';
                h1.innerText = 'O WINS!'
            }
        }

        if (gameStatus === 'won' || gameStatus === 'tie' || gameStatus === null) {
            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        }
        
        function tie () {
            gameStatus = 'tie';
            h1.innerText = 'Tie game!'
            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        }
        
        if (turnNumber > 9) {
            tie();
        }
        
        turnNumber++;
        
        if (currentPlayer === x) {
            currentPlayer = o;
        }
        
        else if (currentPlayer === o) {
            currentPlayer = x;
        }
    })
    //build the 'new game' and 'give up' button functionality
    //it is not disabling when player wins;




});
