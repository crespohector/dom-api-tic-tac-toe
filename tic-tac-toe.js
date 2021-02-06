window.addEventListener("DOMContentLoaded", event =>{
    //declared variables
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

    //define function for page refresh
    function reLoad() {
        // grab moves from localStorage
        xArray = localStorage.getItem('xArray');
        oArray = localStorage.getItem('oArray');
        
        //
        //TODO: finish functions to loop through arrays and scans arrays to find matches  
        function repopulator(array) {
           //converts moves into moves array
            let newArray = array.split(',');
            //TODO: if array.includes a square's id, populate with that character's icon.                        

        }
        //call repopulator function for each character's moves array if there are arrays in localstorage.
        if (xArray) {
            repopulator(xArray);
        }

        if (oArray){
            repopulator(oArray);
        };
    
    }
    //call reload function upon domcontentloaded event to populate board with localstorage
    reLoad();

    //newgame button's reset function resets the game
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
        localStorage.removeItem('xArray');
        localStorage.removeItem('oArray');
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
    });

    //board checks for moves
    board.addEventListener('click', event => {

        let clicked = event.target.id;
        //disable clicks before game/after game is won
        if (gameStatus === 'won' || gameStatus === null) {
            return;
        }
        //create img, place in square div
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
        //disable buttons when appropriate
        if (gameStatus === 'won' || gameStatus === 'tie' || gameStatus === null) {
            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        }
        
        //declare tie actions and when to invoke
        function tie () {
            gameStatus = 'tie';
            h1.innerText = 'Tie game!'
            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        }
        
        if (turnNumber > 9) {
            tie();
        }
        
        //increment the turn counter
        turnNumber++;
        
        //change turns
        if (currentPlayer === x) {
            currentPlayer = o;
        }
        
        else if (currentPlayer === o) {
            currentPlayer = x;
        }
    })
});
