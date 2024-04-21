import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messageType";

export class gameManager {

    private game:Game[];

    constructor(){
        this.game = []
    }

    addUser(socket:WebSocket){

    }

    removeUser(socket:WebSocket){

    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString())
            if(message.type===INIT_GAME){
                
            }else if(message.type === MOVE){

            }
        })
    }
}