import React, { useState } from 'react'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState()

    const validarInput = (e) => {
        e.preventDefault()
        if (!nombre.trim() || !apellido.trim() || !email.trim()) {
            setError(true)
            return
        }
        //Eliminar mensaje de error
        setError(false)
        setNombre('')
        setApellido('')
        setEmail

    }

    return (
        <>
            <div className="container form-group">
                <h4>{nombre}</h4>
                <form onSubmit={validarInput}>
                    {error ? <div className="alert alert-danger">Todos los campos son obligatorios</div> : null}
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" onChange={(e) => setNombre(e.target.value)} name="nombre" />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" className="form-control" id="apellido" onChange={(e) => setApellido(e.target.value)} name="apellido" />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} name="email" />
                    </div>
                    <button className="btn btn-dark mt-3" type="submit">Enviar</button>
                </form>

                {error === false ? (
                    <div className="alert alert-success mt-3">Datos enviados correctamente</div>
                ) : null}
            </div>

        </>
    )
}

export default Formulario