import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as UsuariosServer from "./UsuariosServer";

const MostrarDatoUsuario = ({ usuarioIniciado }) => {
    const navegate = useNavigate();
    const parametros = useParams();
    const initialState = { id: 0, nombre: "", usuario: "", contrasena: "" };

    const [usuarios, setUsuarios] = useState((initialState));


    const handleInputChange = (e) => {
        setUsuarios({ ...usuarios, [e.target.name]: e.target.value });
    };

    const listUsuarios = async () => {
        try {
            const respuesta = await UsuariosServer.listUsuarios();
            const datos = await respuesta.json();
            setUsuarios(datos.usuarios);
            const usuarioIn = usuarioIniciado[0];
            const usuarioFiltrado = await datos.usuarios.filter(usuarios => usuarios.usuario === usuarioIn);
            // console.log("Hola?");
            setUsuarios(usuarioFiltrado);
            listUsuarios();
        } catch (error) {
            console.log(error);
        }
        // console.log(usuarios);
    }

    useEffect(() => {
        listUsuarios();
    }, []);

    return (
        <div className="col-auto p-5 text-center">
            <h2>😄 BIENVENIDO 😄</h2>
            <h3>{usuarioIniciado}</h3>
            <p>-- ¿Qué deseas hacer? --</p>
            <p>En la parte superior tienes tu Menú</p>

        </div>
    );
};

export default MostrarDatoUsuario;