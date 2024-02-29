import React, { useEffect, useState } from "react";


const DataItem = ({ valores }) => {
    return (
        <div className="my-3 border border-light p-3 border-4">
            {/* <h5>{valores.text}</h5> */}
            <label className="text-light fw-bold">Id de registro: </label>
            <p className="border border-2 bg-light border-info px-3">{valores.id}</p>
            <label className="text-light fw-bold" >Texto: </label>
            <p className="border border-2 bg-light border-info px-3">{valores.text}</p>
            <label className="text-light fw-bold" >Cant. Likes</label>
            <p className="border border-2 bg-light border-info px-3">{valores.likes}</p>
            <label className="text-light fw-bold" >Cant. Comentarios</label>
            <p className="border border-2 bg-light border-info px-3">{valores.comments}</p>
            <label className="text-light fw-bold" >Cant. Compartidas</label>
            <p className="border border-2 bg-light border-info px-3">{valores.shares}</p>
            <label className="text-light fw-bold" >Cant. Reacciones</label>
            <p className="border border-2 bg-light border-info px-3">{valores.reactions_count}</p>
            <label className="text-light fw-bold" >Sentimientos</label>
            <p className="border border-2 bg-light border-info px-3">{valores.sentimientos}</p>
            <label className="text-light fw-bold" >Emociones</label>
            <p className="border border-2 bg-light border-info px-3">{valores.emociones}</p>
        </div>
    )

}

export default DataItem;