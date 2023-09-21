import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Abertura from "./pages/abertura";
import Cota from "./components/cota";

function App() {
   return(
      <div>
         <Router>
            <Routes>
               <Route path="/abertura" element={<Abertura />} />
               <Route path="/cota" element={<Cota />} />
            </Routes>
         </Router>
      </div>
   )
}
export default App;
