import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';

import { useState } from 'react';

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos"


function ListaIngresos({ ingresosUsuario, setIngresosUsuario }) {
    // funcion para eliminar un ingreso
    const deleteIngreso = (id) => {
        setIngresosUsuario(ingresosUsuario.filter(ingreso => ingreso.id != id))
    }

    // funcion para modificar un ingreso
    const [showEditGastoIngreso, setShowEditGastoIngreso] = useState(false);
    const handleCloseEditGastoIngreso = () => {
        setShowEditGastoIngreso(false);
    };

    const [fechaEdit,setFechaEdit] = useState(false);
    const handleFechaChange = (event) => {
        setFechaEdit(event.target.value)
    }
    const handleShowEditGastoIngreso = () => setShowEditGastoIngreso(true);

    const [montoEdit,setMontoEdit] = useState(false);
    const handleMontoChange = (event) => {
        setMontoEdit(event.target.value)
    }
    
    
    



    return (
        <Container className='mt-5'>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Comentario</th>
                        <th>Destino</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresosUsuario.map((ingreso) => {
                        return (
                            <tr key={ingreso.id}>
                                <td>{ingreso.fecha.toLocaleDateString('en-GB')}</td>
                                <td>{ingreso.monto}</td>
                                <td>{ingreso.categoria}</td>
                                <td>{ingreso.comentario}</td>
                                <td>{ingreso.destino}</td>
                                <td><ModificarGastosIngresos ingreso={ingreso} handleCloseEditGastoIngreso={handleCloseEditGastoIngreso} showEditGastoIngreso={showEditGastoIngreso} handleShowEditGastoIngreso={handleShowEditGastoIngreso}
                                handleFechaChange={handleFechaChange} handleMontoChange={handleMontoChange}/></td>
                                <td><Button onClick={() => deleteIngreso(ingreso.id)}>X</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>

    );
}

export default ListaIngresos;