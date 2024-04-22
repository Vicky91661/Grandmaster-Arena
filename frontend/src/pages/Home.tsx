
import { FaChessKing } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { FaHandshakeAngle } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";

import chess from "../assets/chess.png"
import { useNavigate } from "react-router-dom";

function Home() {
    const naviagte = useNavigate()

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
            <div className="flex items-center bg-[#1E1E1B] gap-4 p-4 rounded-lg cursor-pointer" onClick={()=>naviagte("/game")}>
                <AiFillThunderbolt className="text-5xl text-yellow-500"/>
                <div>
                    <h1 className="text-3xl font-semibold">Play Online</h1>
                    <h4 className="text-lg font-medium opacity-60">Play vs a person of similar skill</h4>
                </div>
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

export default Home