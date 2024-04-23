import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messageType";
import { Game } from "./game";

export class gameManager {

    private games: Game[];
    private pendingPlayer : WebSocket | null;
    private Users : WebSocket[];

    constructor(){
        this.games = []
        this.pendingPlayer = null;
        this.Users = []
    }

    addUser(socket:WebSocket){
        this.Users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket){
        this.Users = this.Users.filter((user)=> user!==socket)
    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString())
            if(message.type===INIT_GAME){
                if(this.pendingPlayer){
                    const game = new Game(this.pendingPlayer,socket);
                    this.games.push(game);
                    this.pendingPlayer = null;
                }else{
                    this.pendingPlayer = socket;
                }
            }else if(message.type === MOVE){
                const game = this.games.find((game)=>game.player1===socket || game.player2===socket) 
                console.log("move is made with ,",message.move)   
                if(game){
                    game.makeMove(socket,message.move)
                }
            }
        })
    }
}