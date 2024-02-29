import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BarraNav = ({usuarioIniciado, setUserIniciado}) => {
    const navegate = useNavigate();
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        if (usuarioIniciado.length === 0) {
            setValidado(false);
        } else {
            setValidado(true);
        }
    }, [usuarioIniciado]);

    const handleLogOut =()=>{
        setUserIniciado([]);
        navegate("/");
    }

    return (
        <nav className="nav nav-pills flex-column flex-sm-row barra-nav">
            {validado && 
            <>
            <button className="flex-sm-fill text-sm-center nav-link active" onClick={handleLogOut}>Cerrar sesión</button>
            <Link className="flex-sm-fill text-sm-center nav-link" to="/mostrarData">Consultar Data</Link>
            <Link className="flex-sm-fill text-sm-center nav-link" to="/cargarArchivo">Cargar Archivo</Link>
            </>
            }
            {!validado && 
            <>
            <Link className="flex-sm-fill text-sm-center nav-link border" to="/formUsuarios">Crear Usuarios</Link>
            <Link className="flex-sm-fill text-sm-center nav-link border" to="/">Iniciar Sesión</Link>
            </>
            }
        </nav>
    );
};

export default BarraNav;