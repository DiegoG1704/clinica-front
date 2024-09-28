import './App.css';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // Si instalaste PrimeFlex
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Login from './page/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/login/register';
import Index from './page/AdminUsuario/Index';
import Afiliados from './page/AdminUsuario/Afiliados/Afiliados';
import RegisterU from './page/login/RegisterU';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Register />} />
          <Route path="/DatosU" element={<RegisterU />} />
          {/* administrador General */}
          <Route path='/Admin' element={<Index/>}/>
          <Route path='/Afiliados' element={<Afiliados/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
