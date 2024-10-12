import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import "/node_modules/primeflex/primeflex.css";
import Login from './page/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/login/register';
import Index from './page/AdminUsuario/Index';
import Afiliados from './page/AdminUsuario/Afiliados/Afiliados';
import RegisterU from './page/login/RegisterU';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [Datos,setDatos] = useState(null)
  // Función para manejar el login y actualizar el estado de usuario
  const handleLoginId = (userData) => {
    setUser(userData);
  };

  const handleDatos = (userData) => {
    setDatos(userData);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLoginId} />} />
          <Route path="/home" element={<Register onNext={handleDatos}/>} />
          <Route path="/DatosU" element={<RegisterU userData={Datos}/>} />
          {/* Administrador General */}
          <Route path='/Admin' element={<Index />} />
          {/* Afiliados, pasar user y setUser */}
          <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
