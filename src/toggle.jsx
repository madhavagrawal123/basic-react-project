import { useState } from "react";
export default function Toggle(){
    let [Switch,Setswitch] = useState("#0D1B2A");
    const colors = [
  "#0D1B2A", // Deep Navy
  "#E0E1DD", // Pearl White
  "#FFCB77", // Goldenrod
  "#7209B7", // Royal Purple
  "#4CC9F0", // Vivid Sky
  "#F72585", // Cyber Pink
  "#4361EE", // Neon Blue
  "#1B4332", // Forest Green
  "#FF4D00", // Solar Flare
  "#CCFF00", // Electric Lime
  "#3D5A80", // Slate Blue
  "#EE6C4D"  // Burnt Sienna
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return Setswitch(colors[randomIndex]);
};

//  backgroundColor: "#16181a", height: "100vh" }

    return(
        <div style= {{backgroundColor : Switch,height: "100vh"}}>
            <button onClick={getRandomColor}>Swtich theme</button>


        </div>
        
    )
}