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
