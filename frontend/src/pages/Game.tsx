
import { FaChessKing } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { FaHandshakeAngle } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";

import chess from "../assets/chess.png"
import { useNavigate } from "react-router-dom";
import {useState } from "react";
import { useSocket } from "../hooks/useSocket";



const MOVE = "move";
const INIT_GAME= "init_game";
const GAME_OVER = "game_over";

function Game() {
    const socket = useSocket();

    const [flipTimer,setFlipTimer] = useState(false)
    const [timer,setTimer] = useState(10)

    const naviagte = useNavigate()

    

    const handleTimer = (time:number)=>{
        setTimer(time)
        setFlipTimer(!flipTimer)
    }

    const naviagtePlay = ()=>{
        naviagte("/play")
    }

  return (
    <div className="flex bg-[#302E2B]  px-[10vw] text-white min-h-screen">
       <div className=" w-8/12 p-10 ">
            <div className="flex flex-col justify-center chess-board">
                    <div className="flex items-center gap-2 p-4">
                        <div>
                            <IoPersonCircleOutline className="text-4xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">Oponent <span className=" text-yellow-200 opacity-80"> (Waiting . . .)</span> </h1>
                        </div>
                    </div>
                    <div className="">
                        <img className="w-[65%]" src={chess} alt="" />
                    </div>
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
        <div className="play-button  w-3/12 p-10 flex flex-col gap-5 py-20">
            <div className="flex flex-col items-center py-4 gap-2">
                <h1 className="text-5xl font-extrabold font-montserrat">Play Chess</h1>
                <FaChessKing className="text-5xl"/>
            </div>
            <div className="flex justify-center bg-[#3C3B39] p-3 rounded-lg gap-2 cursor-pointer" onClick={()=>setFlipTimer(!flipTimer)}>
                <MdOutlineTimer className="text-[#81B64C] text-4xl " />
                <h1 className="text-3xl font-medium">{timer} min</h1>

            </div>
            {flipTimer && <div className="flex flex-col gap-1">
                <div className="flex justify-center bg-[#3C3B39] p-3 rounded-lg gap-2 cursor-pointer" 
                onClick={()=>handleTimer(10)}>
                    <h1 className="text-3xl font-medium">10 min</h1>
                </div>
                <div className="flex justify-center bg-[#3C3B39] p-3 rounded-lg gap-2 cursor-pointer
                "onClick={()=>handleTimer(15)}>
                    
                    <h1 className="text-3xl font-medium">15 min</h1>
                </div>
                <div className="flex justify-center bg-[#3C3B39] p-3 rounded-lg gap-2 cursor-pointer
                "onClick={()=>handleTimer(30)}>
                    
                    <h1 className="text-3xl font-medium">30 min</h1>
                </div>
            </div>}
            <div className="flex">
                <button className="bg-[#81B64C] rounded-lg w-full py-4 text-3xl font-bold tracking-wide"
                onClick={naviagtePlay}>Play</button>
            </div>
           
            <div className="flex items-center bg-[#1E1E1B] gap-4 p-4 rounded-lg cursor-pointer">
                <HiOutlineComputerDesktop className="text-5xl text-green-700"/>
                <div>
                    <h1 className="text-3xl font-semibold">Play with computer</h1>
                    <h4 className="text-lg font-medium opacity-60">Challenge a bot from easy to master</h4>
                </div>
            </div>
            <div className="flex items-center bg-[#1E1E1B] gap-4 p-4 rounded-lg cursor-pointer">
                <FaHandshakeAngle className="text-5xl text-amber-800"/>
                <div>
                    <h1 className="text-3xl font-semibold">Play a Friend</h1>
                    <h4 className="text-lg font-medium opacity-60">Inviate a friend to a game</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Game