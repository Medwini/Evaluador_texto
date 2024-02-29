import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as UsuariosServer from "./UsuariosServer";


const IniciarSesion = ({ setUserIniciado }) => {
    const navegate = useNavigate();
    const parametros = useParams();

    const initialState = { usuario: "", contrasena: "" };


    const [user, setUsuario] = useState((initialState));
    const [usuario, setUser] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(false);


    const handleInputChange = (e) => {
        setUsuario({ ...user, [e.target.name]: e.target.value });
        const u = user.usuario;
        setUser(u);
        const c = user.contrasena;
        setContrasena(c);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuario === "" || contrasena === "") {
                navegate("/");
                setError(true);
                return
            } else {
                let respuesta;
                respuesta = await UsuariosServer.Login(user);
                const datos = await respuesta.json();
                console.log(datos.mensaje);
                // console.log(datos);
                if (datos.mensaje === "Inicio de sesión exitosa") {
                    setUsuario(initialState);
                    navegate("/inicio/" + usuario);
                    setError(false);
                } else {
                    alert(datos.mensaje);
                    navegate("/");
                    setError(true);
                    return
                }
            }
            setUserIniciado([usuario])
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="my-4">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="m-4">
                <label className="form-label">Usuario</label>
                <input type="text" className="form-control" name="usuario" value={usuario.usuario} onChange={handleInputChange} minLength="3" maxLength="50" />
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" name="contrasena" value={contrasena.contrasena} onChange={handleInputChange} aria-describedby="passwordHelpBlock" minLength="3" maxLength="50" />
                {error && <p>No se pudo iniciar sesión</p>}
                <button type="submit" className="btn-ing px-6 btn btn-lg btn-block btn-outline-light my-5">
                    Ingresar
                </button>

            </form>
        </div>
    );
};

export default IniciarSesion;