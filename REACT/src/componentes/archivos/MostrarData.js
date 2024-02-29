import React, { useEffect, useState } from "react";

import DataItem from "./DataItem";
import * as DatosServer from "./DatosServer";

const MostrarData = (usuarioIniciado) => {

    const [validado, setValidado] = useState(false);
    const [datos, setData] = useState([]);

    const listData = async () => {
        try {
            const respuesta = await DatosServer.listarDatos();
            const data_r = await respuesta.json();
            setData(data_r.data);
            console.log(data_r);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (usuarioIniciado.length === 0) {
            setValidado(false);
        } else {
            setValidado(true);
            listData();
        }
    }, [usuarioIniciado]);

    return (
        <div className="container">
            {validado &&
                <>
                    {datos &&
                        <>
                        {datos.map((valores) => (
                            <DataItem key={valores.id} valores={valores} />
                        ))}
                        </>
                    }
                    {!datos

                    }
                </>
            }
            {!validado &&
                <>
                </>
            }
        </div>
    );


};

export default MostrarData;