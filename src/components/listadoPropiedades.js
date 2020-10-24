import React, {useState, useEffect} from 'react';
import {css} from '@emotion/core'
import usePropiedades from '../hooks/usePropiedades';
import PropiedadPreview from './propiedadPreview';
import ListadoPropiedadesCSS from '../css/listadoPropiedades.module.css'
import useFiltro from '../hooks/useFiltro';

const ListadoPropiedades = () => {

    const resultado = usePropiedades();
    //para mantener la referencia para el filtrado lo almaceno en el hook propiedades
    const [propiedades] = useState(resultado);
    const [filtro, setFiltro] = useState([])
    // console.log(resultado);

    //filtrado de propiedades
    const {categoria,FiltroUI} = useFiltro();

    // console.log(categoria);

    useEffect( () => {
        if(categoria){
            const filtros = propiedades.filter(propiedad => propiedad.categorias.nombre === categoria);
            setFiltro(filtros);
        }else {
            setFiltro(propiedades);
        }
    },[categoria, propiedades])
    
    return (  
        <>
        <h2
            css={css`
            margin-top: 5rem;
        `}
        >Nuestras Propiedades</h2>
        {FiltroUI()}
        <ul className={ListadoPropiedadesCSS.propiedades}>
            {filtro.map(propiedad => (
                <PropiedadPreview 
                    key={propiedad.id}
                    propiedad={propiedad}
                />
            ))}
        </ul>
        </>
    );
}
 
export default ListadoPropiedades;