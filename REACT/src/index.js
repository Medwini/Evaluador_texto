import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BarraNav from './componentes/nav/BarraNav';
import FormUsuarios from './componentes/usuarios/FormUsuarios';
import IniciarSesion from './componentes/usuarios/IniciarSesion';
import MostrarDatoUsuario from './componentes/usuarios/MostrarDatoUsuario';
import CargarArchivo from './componentes/archivos/CargarArchivo';
import MostrarData from './componentes/archivos/MostrarData';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [usuarioIniciado, setUserIniciado] = useState([]);

  return (
    <BrowserRouter>
      <div>
        <BarraNav usuarioIniciado={usuarioIniciado} setUserIniciado={setUserIniciado} />
        <Routes>
          {usuarioIniciado.length === 0 ? (
            <>
              <Route path="/" element={<IniciarSesion setUserIniciado={setUserIniciado} />} exact />
              <Route path="/formUsuarios" element={<FormUsuarios />} />
            </>
          ) : (
            <>
              <Route path="/inicio/:usuario" element={<MostrarDatoUsuario usuarioIniciado={usuarioIniciado} />} exact />
              <Route path="/actualizarUsuario/:id" element={<FormUsuarios />} />
              <Route path="/cargarArchivo" element={<CargarArchivo usuarioIniciado={usuarioIniciado} />} />
              <Route path="/mostrarData" element={<MostrarData usuarioIniciado={usuarioIniciado} />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
