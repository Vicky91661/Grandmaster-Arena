import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Play from "./pages/Play"

function App() {
 
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Home/>}></Route>
      <Route path="/game" element={<Game/>}></Route>
      <Route path="/play" element={<Play/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
    </BrowserRouter>
        
  )
}

export default App
