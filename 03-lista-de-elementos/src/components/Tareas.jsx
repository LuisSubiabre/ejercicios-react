import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoneIcon from '@mui/icons-material/Done';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { tareasIniciales } from '../tareasIniciales';
import DeleteIcon from '@mui/icons-material/Delete';

const Tareas = () => {
    const [nombreTarea, setNombreTarea] = useState("");
    // const [tarea, setTarea] = useState(["tarea 1", "tarea 2", "tarea 3", "tarea 4", "tarea 5"]);
    const [listaTareas, setListaTareas] = useState(tareasIniciales)
    const [error, setError] = useState(false);

    const enviarFormulario = (e) => {
        e.preventDefault();
        if (nombreTarea.trim() !== "") {
            //setTarea([...tarea, nombreTarea]);
            setListaTareas([...listaTareas, { nombre: nombreTarea, completada: false }]);
            setNombreTarea("");
            setError(false);
            return true;
        } else {
            setError(true);
            return false;
        }
    }

    const capturarInput = (e) => {
        setNombreTarea(e.target.value);
    }

    const completarTarea = (tareaIndex) => {
        const nuevasTareas = [...listaTareas] // Copiamos las tareas anteriores
        const index = nuevasTareas.findIndex((element, index) => index === tareaIndex) // Buscamos la tarea que queremos modificar
        nuevasTareas[index].completada = !nuevasTareas[index].completada // Modificamos el valor de completada, si es true lo cambiamos a false y viceversa
        setListaTareas(nuevasTareas) // Actualizamos el estado

        // const nuevaLista = tarea.map((element, index) => {
        //     if (index === e) {
        //         return {
        //             ...element,
        //             completada: !element.completada
        //         }
        //     }
        //     return element;
        // })
        // setTarea(nuevaLista);
    }

    const eliminarTarea = (tareaIndex) => {
        const nuevasTareas = listaTareas.filter((element, index) => index !== tareaIndex)
        setListaTareas(nuevasTareas)

    }
    return (
        <Container maxWidth="sm">
            <form onSubmit={enviarFormulario}>
                <TextField
                    error={error}
                    label="Nueva Tarea"
                    name='nombreTarea'
                    onChange={capturarInput}
                    value={nombreTarea}
                    helperText={error ? "Campo requerido, no puede estar vacío" : ""}
                    required />
                <Button type="submit" variant="contained">Agregar</Button>
            </form>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: 1, borderRadius: '16px', marginTop: '12px' }}>
                <List>
                    {listaTareas.map((element, index) => (
                        <ListItem key={`${element}-${index}`} disablePadding >
                            <ListItemButton style={element.completada === true ? { textDecoration: 'line-through' } : {}}>
                                <ListItemIcon>
                                    {element.completada === true ? <DoneIcon /> : <AssignmentIcon />}
                                </ListItemIcon>
                                <ListItemText primary={element.nombre} />
                                <Button onClick={() => completarTarea(index)}>Completar</Button>
                                <ListItemIcon><DeleteIcon onClick={() => eliminarTarea(index)}></DeleteIcon></ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default Tareas;