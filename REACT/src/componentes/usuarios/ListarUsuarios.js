import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as UsuariosServer from "./UsuariosServer";

import IndUsuarios from "./IndUsuario";


const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    const listUsuarios = async () =>{
        try {
            const respuesta = await UsuariosServer.listUsuarios();
            const datos = await respuesta.json();
            setUsuarios(datos.usuarios);
            console.log(datos.usuarios);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listUsuarios();
    },[]);

    return (
        <div>
            {usuarios.map((users) => (
                <IndUsuarios key={users.id} users={users} listUsuarios={listUsuarios} />
            ))}
        </div>
    );
};

export default ListarUsuarios;