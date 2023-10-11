import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Abertura from "./pages/assets/js/abertura";
import Cota from "./pages/assets/js/cota";
import Sidebar from "./components/sidebar";
import AberturaSemLetras from "./pages/assets/js/semLetras";
import CotaSemLetras from "./pages/assets/js/cotaSemLetra";

function App() {
  return (
    <div className="app-div" >
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
