import { Chess, Color, PieceSymbol, Square } from 'chess.js'
import { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
function Play() {

    const MOVE = "move";
    const INIT_GAME= "init_game";
    const GAME_OVER = "game_over";

    const [chess,setChess ]= useState(new Chess())
    const [board,setBoard] =useState(chess.board())

    const [from ,setFrom] = useState<null|Square>(null)
    const [to ,setTo] = useState<null|Square>(null)
    const [player,setPlayer]=useState<string>("")

    const [currentTurn,setCurrentTurn] = useState<string>("white")

    const [waiting,setWaiting] = useState<boolean>(true)

    const [arrMoves,setArrMoves] = useState<{from:Square,to:Square}[]>([])

    const socket = useSocket();
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket?.send(JSON.stringify({
            type:INIT_GAME
        }))
        socket.onmessage =(event)=>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board()) 
                    console.log("GAME initialize",message.payload.color);
                    setPlayer(message.payload.color)
                    setWaiting(false)
                    setCurrentTurn(message.currentTurn)
                    break;
                case MOVE: 
                    console.log("move made")
                    const move = message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    setCurrentTurn(message.currentTurn)
                    console.log("current turn is ",message.currentTurn)
                    setArrMoves((prevMoves)=>[...prevMoves,move])
                    break;
                case GAME_OVER: 
                    console.log("Game over");
                    break;
            }
        }
    },[socket])

    function handleMove(squareRepresentation:Square,item: {
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null){
        console.log("from => ",from,"and item=>",item,"turn is",currentTurn)
        if((currentTurn==="white"&& !from && item?.color==='b'|| (currentTurn==="black" && !from && item?.color==='w'))){
            return;
        }
        if(!from && !item){
            return;
        }
        if((!from && (player==="white" && item?.color==='b')||(player==="black" && item?.color==='w'))){
            return;
        }
        console.log("piece clicked on ",squareRepresentation)
        if(!from){
            setFrom(squareRepresentation)
        }else{
            socket?.send(JSON.stringify({
                type:MOVE,
                move:{
                    from,
                    to:squareRepresentation
                }
            }))
            
            try {
                chess.move({
                    from,
                    to:squareRepresentation
                })
                setArrMoves((prevMoves)=>[...prevMoves,{from,
                    to:squareRepresentation}])
                setBoard(chess.board())
                setFrom(null);
            } catch (error) {
                setFrom(null);
            }
            
            
            
        }
    }

    // :{square: string, type: string, color: string}[]
    if(waiting)
            return (
                <div className='bg-[#302E2B] w-full h-[100vh] flex flex-col justify-center items-center gap-5'>
                    <div role="status">
                        <svg aria-hidden="true" className=" w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-[#81B64C]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-white font-montserrat'>Waiting for Other openent to join</h1>
                </div>
            )
  return (
    <div className="flex bg-[#302E2B]  px-[10vw] text-white min-h-screen">
        <div className=" w-8/12 p-10 ">
            <div className="flex flex-col justify-center chess-board">
                <div className="flex items-center gap-2 p-4">
                    <div>
                        <IoPersonCircleOutline className="text-4xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">Oponent</h1>
                    </div>
                </div>

                {board.map((arr,i)=>(
                    <div className='flex ' key={i}>
                    {arr.map((item,j)=>{
                        const squareRepresentation = String.fromCharCode(97+(j%8))+""+(8-i) as Square;
                        return <div onClick={()=>handleMove(squareRepresentation,item)} key={j} className={`${(i + j) % 2 === 0 ? 'bg-[#739552]' : 'bg-[#EBECD0]'} 
                        flex items-center justify-center w-28 h-28`}>
                            {item&&<img src={`./${item?.color === 'b' ? item?.type : item?.type?.toUpperCase() + 'a'}.png`} 
                            alt={`${item?.color}${item?.type}`} />}
                            <h1>{squareRepresentation}</h1>
                        </div>
                    })}
                    </div>
                ))}

                <div className="flex items-center gap-2 p-4">
                    <div>
                        <IoPersonCircleOutline className="text-4xl"/>
                    </div>
                    <div>
                    <h1 className="text-2xl font-semibold">User (450)</h1>
                        
                    </div>
                </div>

            </div>
        </div>
        <div className="play-button  w-4/12 p-10 flex flex-col gap-5 py-20  ">
            <div className='h-[80vh] bg-[#1E1E1B] bg-opacity-85 rounded-lg'>
            <h1 className=' text-3xl font-bold text-center pt-3'>Moves Made</h1>
                <div className='flex h-[70vh] flex-col p-10  gap-1 overflow-y-scroll
                 '>
                    
                {arrMoves.map((item,index)=>(
                    <div key={index}>
                        <div className='text-xl flex justify-center items-center gap-4 text-white bg-[#739552] rounded-lg text-center p-2'>{item.to} <FaLongArrowAltRight className=' inline-block'/> {item.from}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>
 </div>
  )
}
import { useSocket } from '../hooks/useSocket';


export default Play