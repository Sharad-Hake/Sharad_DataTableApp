// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DataTable from "./screens/DataTable";
import { Avatar } from "@mui/material";
import logo from "./assets/logo.png"; // Path to your logo image file

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          flex: 1,
          width: "100%", // Take the full width of the parent container or screen
          height: "100vh", // Full viewport height
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          overflowX: "hidden", // Prevent horizontal scrolling          
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}></div>
        <div style={{ width: "20%",height:'100%' }}>
          <img src={logo} alt="App Logo" className="logo" />
        </div>
        <div style={{ width: "80%" }}>
          <DataTable />
          {/* Other content */}
        </div>
      </div>
    </>
  );
}

export default App;
