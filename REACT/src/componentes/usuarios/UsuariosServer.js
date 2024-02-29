const API_URL = "http://127.0.0.1:8000/lib_api/data/";
const API_URL_login = "http://127.0.0.1:8000/lib_api/data/login";

export const listUsuarios = async () => {
    return await fetch(API_URL);
};

export const obtenerUsuarios = async (userId) => {
    return await fetch(`${API_URL}${userId}`);
};

export const regUsuario = async (nuevoUsuario) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": String(nuevoUsuario.nombre).trim(),
            "usuario": String(nuevoUsuario.usuario).trim(),
            "contrasena": String(nuevoUsuario.contrasena).trim(),
        })
    });
};

export const eliminarUsuario = async (userId) => {
    return await fetch(`${API_URL}${userId}`, {
        method: 'DELETE',
    });
};

export const actUsuario = async (userId, nuevoUsuario) => {
    return await fetch(`${API_URL}${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": String(nuevoUsuario.nombre).trim(),
            "usuario": String(nuevoUsuario.usuario).trim(),
            "contrasena": String(nuevoUsuario.contrasena).trim(),
        })
    });
};

export const Login = async (user) => {
    return await fetch(API_URL_login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "usuario": String(user.usuario).trim(),
            "contrasena": String(user.contrasena).trim(),
        })
    });
};


