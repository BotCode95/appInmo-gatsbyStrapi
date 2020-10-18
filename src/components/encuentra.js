import React from 'react'
import {graphql, useStaticQuery} from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import heroCSS from '../css/hero.module.css';
import styled from '@emotion/styled';

const ImagenBackground = styled(BackgroundImage)`
    height: 300px;
`;

const Encuentra = () => {

    const {imagen} = useStaticQuery(graphql`
        query{
                imagen: file(relativePath: {eq: "encuentra.jpg"}){
                    sharp: childImageSharp{
                        fluid(maxWidth: 1500){
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
    `);

    // console.log(imagen);
    return ( 
        <ImagenBackground
            tag="section"
            fluid={imagen.sharp.fluid}
            fadeIn="soft"
        >
            <div>
                <h3 className={heroCSS.imagenbg}>Encuentra la casa de tus sueños</h3>
                <p className={heroCSS.titulo}> 15 años de experiencia</p>
            </div>
        </ImagenBackground>
    );
}
 
export default Encuentra;