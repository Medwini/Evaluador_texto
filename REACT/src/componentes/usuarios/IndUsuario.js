import React from "react";
import { useNavigate } from "react-router-dom";

import * as UsuariosServer from "./UsuariosServer";


const IndUsuario = ({ users, listUsuarios }) => {
    const navegate = useNavigate();

    const handleDelete = async (userId) => {
        await UsuariosServer.eliminarUsuario(userId);
        listUsuarios();
    };
    
    return (
        <div>
            <p></p>
            <h3 className="card-title">
                {users.nombre}
                <button onClick={() => navegate(`/actualizarUsuario/${users.id}`)} className="ms-2 btn btn-sm btn-info">
                    Update
                </button>
            </h3>
            <p className="card-text">
                Usuario: <strong>{users.usuario}</strong>
            </p>
            <p className="card-text">
                Usuario: <strong>{users.contrasena}</strong>
            </p>
            <button onClick={() => users.id && handleDelete(users.id)} className="btn btn-danger my-2">
                Eliminar
            </button>
        </div>
    );
};

export default IndUsuario;