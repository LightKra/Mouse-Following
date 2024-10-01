import { useState, useEffect } from "react"

function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(()=>{
   const handlerMove =(event)=>{
    const {clientX, clientY} = event;
    setPosition({x: clientX, y: clientY});
   }

   if(enable){
    window.addEventListener("pointermove", handlerMove);
   }
   return ()=>{
    window.removeEventListener("pointermove", handlerMove);
    setPosition({x: 0, y:0});
   }
  }, [enable]);

  useEffect(()=>{
    document.body.classList.toggle("no-cursor", enable);
    
    return ()=>{
      document.body.classList.remove("no-cursor");
    }
  }, [enable])

  const hanlderClick = ()=>{
    setEnable(!enable);
  }
  const buttonText = enable ? "Activado" : "Desactivado";
  return(
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>
      </div>
      <button onClick={hanlderClick}>{buttonText}</button>
    </main>
  )
}

export default App
