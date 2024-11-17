import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Assignment3 } from "./screens";
import { Assignment4 } from "./screens/Assignment4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assignment3 />} />
        <Route path="/other" element={<Assignment4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
