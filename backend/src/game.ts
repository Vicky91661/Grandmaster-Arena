import WebSocket from "ws";
import {Chess} from "chess.js"
import { INIT_GAME,GAME_OVER,MOVE } from "./messageType";


export class Game{
    public player1 :WebSocket;
    public player2 : WebSocket;
    public board:Chess;
    private startTIme : Date;
    private moveCount:number;

    constructor(player1:WebSocket, player2 : WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTIme = new Date();
        this.moveCount = 0;

        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color : "white"
            }

        }))

        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))

    }

    makeMove(socket:WebSocket,move:{
         from: string,
         to: string   
    }){
        if(this.moveCount%2 === 0 && socket!=this.player1){
            return;
        }
        if(this.moveCount%2 === 1 && socket!==this.player2){
            return ;
        }

        try {
            this.board.move(move)
        } catch (error) {
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winnner:this.board.turn()==="w"?"black":"white"
                }
            }))

            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winnner:this.board.turn()==="w"?"black":"white"
                }
            }))
            return;
        }

        if(this.moveCount%2 ===0 ){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
    }
}