import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

import * as DatosServer from "./DatosServer";

const CargarArchivo = (usuarioIniciado) => {
    const navegate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [registrosProcesados, setRegistrosProcesados] = useState([]);
    const [dato_resp, setDatos] = useState([]);
    const [validado, setValidado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleFileChange = (e) => {
        const archivoSelect = e.target.files[0];
        setCargando(true);
        Papa.parse(archivoSelect, {
            header: true,
            complete: function (results) {
                setArchivo(results.data);
                const registros = results.data;
                const registrosProcesados = [];
                registros.forEach(async (registro) => {
                    try {
                        const respuesta = await DatosServer.regDatos(registro);
                        const datos = await respuesta.json();
                        registrosProcesados.push(registro);
                        setRegistrosProcesados([...registrosProcesados]); // Actualizar el estado con los registros procesados
                        console.log(datos.data.length);
                    } catch (error) {
                        console.error('Error al enviar el registro:', error);
                    }
                    setCargando(false);
                    navegate("/mostrarData");
                });

            }
        });


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let respuesta;

            respuesta = await DatosServer.eliminarDatos();
            const datos = await respuesta.json();
            console.log(datos);

            if (datos.mensaje === "Datos eliminados con exito, ya puede volver a cargar") {
                setArchivo(null);
                setRegistrosProcesados([]);
                alert(datos.mensaje);
            }
            else {
                alert(datos.mensaje);
            }
            navegate("/cargarArchivo");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (usuarioIniciado.length === 0) {
            setValidado(false);
        } else {
            setValidado(true);
        }
    }, [usuarioIniciado]);

    return (
        <div>
            {validado &&
                <>
                    <form className="m-4">
                        <label className="form-label">Archivo:</label>
                        <input type="file" className="form-control my-4" name="archivocsv" autoFocus onChange={handleFileChange} />
                        <p>👇Si requiere <span>Eliminar</span> todos los renglones registrados puede presionar el botón</p>
                        <button type="submit" onClick={handleSubmit} className="btn btn-block btn-success">
                            Eliminar Datos
                        </button>
                    </form>

                    {cargando &&
                        <>
                            <h3 className="m-3">
                                Cargando datos...
                            </h3>
                        </>

                    }
                </>

            }
            {!validado &&
                <div class="alert alert-danger" role="alert">
                    ❌ Aún no ha iniciado sesión 🤔
                </div>
            }
        </div >
    );
};

export default CargarArchivo;