import { useState } from "react";
import "./count.css"

export default function Count() {
    let [countx, setcountx] = useState(0);
    let [value, setvalue] = useState(0);
    let [show,setshow] = useState(false);
    const numbers = [];
    for (let i = 1; i <= 10; i++) {
        numbers.push(i);
    }
    


    let inccount = () => {
        setcountx((prev) => prev + 1)
    }

    let decccount = () => {
        if (countx > 0) {
            setcountx((prev) => prev - 1)
        } else {
            return;
        }
    }
    let setinput = (event) => {
        setcountx(event.target.value);
    }
    return (
        <> 
            
            <h1>count is {countx}</h1>
            <button onClick={inccount}>increment</button>
            <button onClick={decccount}>Decrement</button>
            <button onClick={() => setcountx(0)}>Reset</button>
             <input type="number" value={countx} onChange={setinput}/>
            

            {/* 
            <input type="text" value={value} onChange={setval} />
            <h2>{value}</h2> */}
            <br /><br />
            
            <button onClick = {() =>setshow((prev)=>(!prev))}> <h3>{!show?"show the table" : "hide the table"}</h3></button>
            {show && (
              <ul>
               { numbers.map((num)=>(
                    <li>{num*countx}</li>
                ))}
            </ul>)}
            
            
            



        </>
    )
}