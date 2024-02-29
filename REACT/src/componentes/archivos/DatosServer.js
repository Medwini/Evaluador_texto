const API_URL = "http://127.0.0.1:8000/lib_api/data/cargarArchivo";

export const regDatos = async (archivo) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "text" : String(archivo.text).trim(),
            "likes" :  parseInt(archivo.likes),
            "comments" : parseInt(archivo.comments),
            "shares" : parseInt(archivo.shares),
            "reactions_count" :  parseInt(archivo.reactions_count),
        })
    });
};

export const listarDatos = async () => {
    return await fetch(API_URL);
};



export const eliminarDatos = async () => {
    return await fetch(API_URL, {
        method: 'DELETE',
    });
};