import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

function ListaIngresos({ ingresosUsuario }) {
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
                    </tr>
                </thead>
                <tbody>
                    {ingresosUsuario.map((ingreso) => {
                        return (
                            <tr>
                                <td>{ingreso.fecha.toLocaleDateString('en-GB')}</td>
                                <td>{ingreso.monto}</td>
                                <td>{ingreso.categoria}</td>
                                <td>{ingreso.comentario}</td>
                                <td>{ingreso.destino}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>

    );
}

export default ListaIngresos;