// it is a faileed project
import { useState } from "react";
import sw from "star-wars-quotes";

export default function Quotegen() {
    let [Quote,SetQuote] = useState(sw());
   let quotegen = () => {
     SetQuote(sw());
   }

  return (
    <div>
      <h2>Star Wars Quote</h2>
       <h2>{Quote}</h2>
       <button onClick={quotegen} >Generate New Quote</button>
      
    </div>
  );
}