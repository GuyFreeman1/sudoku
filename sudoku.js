let easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------", // string 1 [0]
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298" // string 2 [1]
];
let medium = [
    "-----2----4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--", // string 1 [0]
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895" // string 2 [1]
];
let hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--", // string 1 [0]
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841" // string 2 [1]
];

// variables 
var lives; // lives*
var selectedNum; // selected number*
var selectedTile; // selected tile*
var disableSelect; // disable select* 

window.onload = function () {

    id("start").addEventListener("click", startGame);  // makes the start button functional when clicked


    // add event listener to each number in "digits"" 
    for (let i = 0; i < id("digits").children.length; i++) { // run a loop for each of the numbers inside the digits element (html) 1-9.
        id("digits").children[i].addEventListener("click", function () { // makes the digits tiles functional when clicked. (create a function when clicked*)

            // if selecting is not disabled 
            if (!disableSelect) { // if its false**

                //if number already selected 
                if (this.classList.contains("selected")) { // css ( this because its insdide the event listner function)
                    // then remove selection
                    this.classList.remove("selected"); // css ( this because its insdide the event listner function)
                    selectedNum = null;
                }
                else { // if it was not alredey selected.

                    // deslect all others 
                    for (let i = 0; i < 9; i++) { // run a loop thru the digits element (html) p 1-9.
                        id("digits").children[i].classList.remove("selected"); // css evrytime you select a number it will be removed from the previous.
                    }
                    this.classList.add("selected"); // css ( this because its insdide the event listner function)
                    selectedNum = this; // update selectedNum.
                    updateMove();
                }
            }
        });
    }
}



function startGame() { // the function that will start the game.

    let board; // because we used 'let' , we can only use this inside that function 

    // choose difficulty 
    if (id("easy").checked) board = easy[0]; // a condition let us choose easy diff[0] when checked ([0] in the arry )
    else if (id("normal").checked) board = medium[0]; // a condition let us choose medium diff[0] when checked ([0] in the arry )
    else board = hard[0]; // a condition let us choose hard diff[0] when checked ([0] in the arry )


    // set lives to 3
    lives = 3;

    // enable selecting numbers and tiles
    disableSelect = false; // whenever it false ,we are able to select numbers and tiles.

    id('lives').textContent = 'lives remaining: 3';

    generateBoard(board);  // created board based on difficulty 

}

function generateBoard(board) { // function to crate board. 

    // clear previous board
    clearPrevious(); // function to clear the previous boards when start a new game.

    let idCount = 0; // assign tile id *

    // create 81 tiles 
    for (let i = 0; i < 81; i++) { // run a loop from 0- 81 to create the tiles.

        // create new paragraph element 
        let tile = document.createElement("p"); // create a <p> element.

        // if the tile is not supposed to be blank
        if (board.charAt(i) != "-") { // if its not empty 
            tile.textContent = board.charAt(i); // set tile text to correct number. // 
        }
        else {
            tile.addEventListener("click", function () { // add click event listener to tile 

                // if selecting is not disabled 
                if (!disableSelect) { // if its false**.

                    // if the tile is already selected 
                    if (tile.classList.contains("selected")) { // css

                        // then remove selection 
                        tile.classList.remove("selected"); // css
                        selectedTile = null;
                    }
                    else {
                        // deslect all other tiles 
                        for (let i = 0; i < 81; i++) { // run a  loop to 81 (tile)
                            qsa(".tile")[i].classList.remove("selected"); // because we want to check each tile ** 
                        }
                        // add selection and update variable 
                        tile.classList.add("selected"); // css
                        selectedTile = tile; // update selectedTile
                        updateMove();
                    }
                }
            });
        }

        tile.id = idCount;  // assign tile id *.
        idCount++; // increase by 1.
        tile.classList.add("tile"); // add class to all tiles (css) (81 times cuz its inside the loop.)

        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) { // the tile 18-26 , 45 - 53. 
            tile.classList.add("bottomBorder")// add a class to make bottom border(Horizontal)
        }
         // every tile id will be equal to tile num +1 , if you divide the number by 9 and the remainder will be 3 it will thicken the right border
        // for example will need to thicken right border for tiles 2,11 and 20
        // when tile.id = 2 , tile.id = 2+1 % 9 = 0 , reminder 3 , means right border need to be thicker
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) { // 
            tile.classList.add("rightBorder") // add a class to make bottom border(Vertical)
        }
        id("board").appendChild(tile); // add the tile to the board (create our sudoku puzzle)
    }
}

function updateMove() { // a function to make the game playable.

    // if a tile and a number is selected 
    if (selectedTile && selectedNum) {

        selectedTile.textContent = selectedNum.textContent; // set the tile to the correct number

        if (checkCorrect(selectedTile) == true) { // if the number matches the solution

            //deslects the tile 
            selectedTile.classList.remove("selected"); // css
            selectedNum.classList.remove("selected"); // css

            //clear the selected variables
            selectedNum = null;
            selectedTile = null;

            if (checkDone()) { // check if board is completed.
                endGame();
            }
        }
        else { // if the number does not match the solution .

            //disable selecting new numbers for one 
            disableSelect = true; // won't be able to choose numbers or tiles

            // make the tile turn red 
            selectedTile.classList.add("incorrect"); // css

            // run in 1 sec
            setTimeout(function () {
                // substruct lives by 1
                lives--; // 1 sec after wrong placement .

                // if no life remain end the game
                if (lives == 0) {
                    endGame();

                } else {  // if lives is not 0

                    // update the lives text
                    id('lives').textContent = 'lives remaining: ' + lives;

                    //reanble selecting numbers and tiles
                    disableSelect = false; // let us keep play.
                }
                // restore color
                selectedTile.classList.remove("incorrect"); // css remove the red color
                selectedTile.classList.remove("selected"); // css
                selectedNum.classList.remove("selected"); // css
                // clear the tiles text and clear selected variables
                selectedTile.textContent = ""; // if the number is incorrecet, wont stay in the tile.
                selectedTile = null;
                selectedNum = null;
            }, 1000); // equl to 1 second (when wrong number been placed it'll show for 1 sec then return it)
        }
    }
}

function checkDone() { // a function to check if the game is over.
    let tiles = qsa(".tile"); // each tile of the board become an arry.
    for (let i = 0; i < tiles.length; i++) { // a loop that run thru the tiles (81 times)
        if (tiles[i].textContent == "") return false; // if any of the tiles is still empty the game is not over yet.
    }
    return true; // Game Over Baby !
}

function endGame() {
    disableSelect = true; // evrything is dissabled .
    if (lives == 0) { // if lives are 0 you lose.
        id('lives').textContent = 'You Lost ! HA-HA'; // changing the the textContect of lives - lose.
    } else { // if lives are Not 0 you win.
        id('lives').textContent = 'You Won ! No Shit'; // changing the the textContect of lives - win.
    }

}

function checkCorrect(tile) {
    // set solution based on difficulty 
    let solution;
    if (id("easy").checked) solution = easy[1]; // a condition let us compare easy diff[1] solution when checked ([1] in the arry ).
    else if (id("normal").checked) solution = medium[1]; // a condition let us compare medium diff[1] solution when checked ([1] in the arry ).
    else solution = hard[1]; // a condition let us compare hard diff[1] solution when checked ([1] in the arry ).

    // if tiles number is equal to solutions number 
    if (solution.charAt(tile.id) == tile.textContent) {
        return true; // keep the number in the tile
    }
    else {
        return false; // return the number from the tile.
    }
}



function clearPrevious() { // clear previous boards .

    let tiles = qsa(".tile"); // let us acesses all the tiles.

    //remove each tile
    for (let i = 0; i < tiles.length; i++) { // run a loop thru all the tiles.
        tiles[i].remove(); // remove the tile from the arry ( let tiles )  . 
    }
    //deselect any numbers
    for (let i = 0; i < id("digits").children.length; i++) {  // run a loop thru the digits includes evrything inside ( 1-9 ).
        id("digits").children[i].classList.remove("selected");  // when we start a new game the numbers from a previos game won't stay .
    }
    //clear selected variables 
    selectedTile = null;
    selectedNum = null;
}



// helper functions .

function id(id) {
    return document.getElementById(id); // a short cut - insted of getElementById.
}

function qs(selector) {
    return document.querySelector(selector); // a short cut - insted of querySelector The querySelector() method returns the first element that matches a CSS selector.
}

function qsa(selector) {
    return document.querySelectorAll(selector); // a short cut - querySelectorAll  The querySelectorAll() method returns all elements that matches a CSS selector.
}




///// ** remaindrs

// The charAt() method returns the character at a specified index (position) in a string
// The children property returns a collection of an element's child elements.