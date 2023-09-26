import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Abertura from "./pages/abertura";
import Cota from "./components/cota";
import Sidebar from "./components/sidebar";
import AberturaSemLetras from "./pages/semLetras";
import CotaSemLetras from "./components/cotaSemLetra";

function App() {
  return (
    <div>
      <div>
         <Sidebar />
      </div>
      <div>
        <Router>
          <Routes>
            <Route path="/abertura" element={<Abertura />} />
            <Route path="/abertura/semletras" element={<AberturaSemLetras/>}/>
            <Route path="/cota" element={<Cota />} />
            <Route path="/cota/semletras" element={<CotaSemLetras />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
