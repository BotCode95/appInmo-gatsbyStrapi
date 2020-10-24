const urlSlug  =require('url-slug');

exports.createPages = async ({actions, graphql, reporter}) => {
    const resultado = await graphql(`
    query {
        allStrapiPaginas {
            nodes{
              nombre
              id
            }
        }
        allStrapiPropiedades {
          nodes {
            nombre 
            id
          }
        }
      }
      `);
      //console.log(JSON.stringify(resultado.data.allStrapiPropiedades));
      if(resultado.errors){
        reporter.panic('No hubo resultado', resultado.errors);
      }

      //si hay resultado generar los archivos
      const paginas = resultado.data.allStrapiPaginas.nodes;
      const propiedades = resultado.data.allStrapiPropiedades.nodes;

      //template de paginas
      paginas.forEach(pagina => {
        actions.createPage({
          path: urlSlug(pagina.nombre),
          component: require.resolve('./src/components/paginas.js'),
          context: {
            id: pagina.id
          }
        })
      })

      //template de propiedades
      propiedades.forEach(propiedad => {
        // el nombre de la ruta quedara del estilo casa-en-el-lago
        actions.createPage({
          path: urlSlug(propiedad.nombre),
          component: require.resolve('./src/components/propiedades.js'),
          context: {
            //variable que se pasa automaticamente  al componente propiedad
            //con ese id puede hacer la consulta a la bd
            id: propiedad.id
          }

        })
      })
}
