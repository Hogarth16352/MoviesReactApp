import React from 'react'

export const Componente = ( { titulo, contenido } ) => {

  return (
    <>
        <div className='container'>
            <h1> { titulo } </h1>
            <h3> { contenido } </h3>
        </div>
    </>
 )

}
