import { useEffect } from "react"
import Login from "./components/Login"
import Player from "./components/Player";
import { reducerCases } from "./utils/Constants";
import { getTokenFromUrl } from "./utils/spotify"
import { useStateProvider } from "./utils/StateProvider"

function App() {
  const [{token}, dispatch] = useStateProvider();
  useEffect(()=>{
    const token = getTokenFromUrl();
    // console.log(token);
    dispatch( {type: reducerCases.SET_TOKEN, token})
  },[token, dispatch])

  return (
    <div>
      {token? <Player/> :   <Login/> }
    </div>
  )
}

export default App
