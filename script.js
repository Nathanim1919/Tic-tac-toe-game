
const playBtn = document.getElementById('play');
const sideBar = document.getElementById('sidebar');
const gameFields = document.querySelectorAll('.cell');
const scoreDisplay =  document.querySelector('.scoreDisplay');
const backdrop = document.querySelector('.backdrop');
const winnerIs =document.querySelector('.winnerIs');
const restart = document.querySelector('.restart');
const change_mode = document.querySelector('.change-mode');
const modes = document.querySelectorAll('.modes');


// select the playing modes using their id
const twoPlayer = document.getElementById('two-player');
const rcomputer = document.getElementById('rcomputer');
const scomputer = document.getElementById('scomputer');



playBtn.addEventListener('click', toggleSideBar);


function toggleSideBar() {
    sideBar.classList.toggle('showSideBar');
}





// player class

class player{
    constructor(sign){
        this.sign = sign;
    }


    getSign(){
        return this.sign;
    }

    setSign(sign){
        this.sign = sign;
    }
}


class Gameoard{
   
    constructor(){
        this.board = ['','','','','','','','',''];
    }
   


    getField(index){
        return this.board[index];
    }
    

    setField(index,currentSign){
        this.board[index] = currentSign;
        this.updateGameBoard();
    }


    emptyFields(){
        this.myemptyFields = [];
        for (let i = 0; i < this.board.length; i++) {
           if (this.board[i] == '') {
             this.myemptyFields.push(i);
           }
        }

        return this.myemptyFields;
    }


    updateGameBoard(){
       for (let i = 0; i < this.board.length; i++) {
         gameFields[i].textContent = this.board[i];
       }
    }

    resetBoard(){
        for (let i = 0; i < this.board.length; i++) {
             this.board[i] = ''
        }
        this.updateGameBoard();
    }
}


class Game{
    round = 1;
    twoPlayerMode = false;
    randomComputerMode = false;
    smartComputerMode = false;

    POSSIBLE_WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    // creating two players and assign their respetive signs
    playerX = new player('X');
    playerO = new player('O');


    getCurrentPlayerSign(){
        return this.round%2==1?this.playerX.getSign():this.playerO.getSign();
    }

    

    gameMode(){
         twoPlayer.addEventListener('click',()=>{
            if (!rcomputer.classList.contains('selected') && !scomputer.classList.contains('selected')) {
                twoPlayer.classList.add('selected');
                rcomputer.classList.remove('selected');
                scomputer.classList.remove('selected');
                this.twoPlayerMode = true;
                this.randomComputerMode = false;
                this.smartComputerMode = false;
            }
           
         });

         rcomputer.addEventListener('click',()=>{
            if (!twoPlayer.classList.contains('selected') && !scomputer.classList.contains('selected')) {
                rcomputer.classList.add('selected');
                scomputer.classList.remove('selected');
                twoPlayer.classList.remove('selected');
                this.twoPlayerMode = false;
                this.randomComputerMode = true;
                this.smartComputerMode = false;
            }
         });

         scomputer.addEventListener('click',()=>{
            if (!twoPlayer.classList.contains('selected') && !rcomputer.classList.contains('selected')) {
                rcomputer.classList.remove('selected');
                scomputer.classList.add('selected');
                twoPlayer.classList.remove('selected');
                this.twoPlayerMode = false;
                this.randomComputerMode = false;
                this.smartComputerMode = true;
            }
         });
    }
}


class DisplayContrller{
        gameboard = new Gameoard();
        game = new Game();

        checkWinner(){
            return this.game.POSSIBLE_WINNING_COMBINATIONS.some(combination=>{
                return combination.every(index=>{
                    return this.gameboard.getField(index) == this.game.getCurrentPlayerSign(); 
                });
            });
        }

        checkDraw(){
            return this.game.POSSIBLE_WINNING_COMBINATIONS.every(combination=>{
                return combination.every(index=>{
                    return this.gameboard.getField(index) != ''; 
                });
            });
        }

       
        changeMode(){

            scoreDisplay.classList.remove('showScore');
            backdrop.classList.remove('showbackdrop');
            modes.forEach(mode=>{
                mode.classList.remove('selected')
            });

            this.game.round = 1;
            this.game.twoPlayerMode = false;
            this.game.randomComputerMode = false;
            this.game.smartComputerMode = false;
           
        }

        restartGame(){
            scoreDisplay.classList.remove('showScore');
            backdrop.classList.remove('showbackdrop');
            this.game.round = 1;
           
        }

        GameOver(){
            if(this.checkWinner()){
                scoreDisplay.classList.add('showScore');
                backdrop.classList.add('showbackdrop');
                winnerIs.textContent = `The Winner is ${this.game.getCurrentPlayerSign()}`;
                if (this.game.getCurrentPlayerSign() == 'X') {
                    return -1;
                }
                else if(this.game.getCurrentPlayerSign()=='O'){
                    return 1;
                }
            }

            else if(this.checkDraw()){
                scoreDisplay.classList.add('showScore');
                backdrop.classList.add('showbackdrop');
                winnerIs.textContent = `Tie`;
                return 0;
            }
        }

        randomAiMove(){
            let myfields = [];
            myfields = this.gameboard.emptyFields();
            let randomMove = Math.floor(Math.random()*myfields.length);
            this.gameboard.setField(myfields[randomMove],this.game.getCurrentPlayerSign())
            this.GameOver();                                                                                                
            this.game.round++; 
        }

        // minimax(){
        //     let result = 
        // }

        // smartComputerMove(){

        // }



        gamestart(){
                this.game.gameMode();
                gameFields.forEach((cell,i)=>{
                    cell.addEventListener('click',(e)=>{
                        if (this.gameboard.getField(i) == '' ){

                            if(this.game.twoPlayerMode) {
                                this.gameboard.setField(i,this.game.getCurrentPlayerSign());
                                this.GameOver();
                                this.game.round++;
                            }

                            else if(this.game.randomComputerMode) {
                                this.gameboard.setField(i,this.game.getCurrentPlayerSign());
                                this.GameOver();
                                this.game.round++;
                                setTimeout(this.randomAiMove(),9500)
                                // this.randomAiMove();    
                            }
                            
                            
                            else if(this.game.smartComputerMode) {
                                this.gameboard.setField(i,this.game.getCurrentPlayerSign());
                                this.GameOver();
                                this.game.round++;
                                this.smartComputerMove();    
                            }
                        }
                 });
                      
             });
         } 
                 
}
 

    // new Gameoard().updateGameBoard();
    const gameStart = new DisplayContrller()
    change_mode.addEventListener('click',()=>{
        gameStart.changeMode();
        gameStart.gameboard.resetBoard();

    });


    restart.addEventListener('click',()=>{ 
        gameStart.restartGame();
        gameStart.gameboard.resetBoard();
    });


    gameStart.gamestart()

