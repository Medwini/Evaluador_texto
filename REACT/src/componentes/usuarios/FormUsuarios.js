import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as UsuariosServer from "./UsuariosServer";

const FormUsuarios = () => {
    const navegate = useNavigate();
    const parametros = useParams();

    const initialState = { id: 0, nombre: "", usuario: "", contrasena: "" };

    const [usuarios, setUsuarios] = useState((initialState));
    const [error, setError] = useState(false);


    const handleInputChange = (e) => {
        setUsuarios({ ...usuarios, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let respuesta;
            if (!parametros.id) {
                if (usuarios.nombre ==="" || usuarios.usuario ==="" || usuarios.contrasena ===""){
                    navegate("/formUsuarios");
                    alert("Existen valores vacíos, por favor complete el formulario");
                    return
                }else{
                    respuesta = await UsuariosServer.regUsuario(usuarios);
                    const datos = await respuesta.json();
                    if (datos.mensaje === "Registrado exitosamente") {
                        setUsuarios(initialState);
                        alert("Usuario Registrado con Exito!");
                    }
                }
            } else {
                await UsuariosServer.actUsuario(parametros.id, usuarios);
            }
            navegate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const obtenerUsuarios = async (userId) => {
        try {
            const respuesta = await UsuariosServer.obtenerUsuarios(userId);
            const datos = await respuesta.json();
            const { nombre, usuario, contrasena } = datos.usuarios[0];
            setUsuarios({ nombre, usuario, contrasena });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (parametros.id) {
            obtenerUsuarios(parametros.id);
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className="m-4">
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="nombre" value={usuarios.nombre} onChange={handleInputChange} autoFocus minLength="3" maxLength="100" />
                <label className="form-label">Usuario</label>
                <input type="text" className="form-control" name="usuario" value={usuarios.usuario} onChange={handleInputChange} minLength="3" maxLength="50" />
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" name="contrasena" value={usuarios.contrasena} onChange={handleInputChange} aria-describedby="passwordHelpBlock" minLength="8" maxLength="50" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
                {parametros.id ? (
                    <button type="submit" className="btn btn-block btn-primary">
                        Actualizar
                    </button>
                ) : (
                    <button type="submit" className="btn btn-block btn-success">
                        Registrar
                    </button>
                )}

            </form>
        </div>
    );
};

export default FormUsuarios;