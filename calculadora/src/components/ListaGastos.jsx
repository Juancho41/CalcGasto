import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

function ListaGastos({ mockDataGastos }) {
    return (
        <Container className='mt-5'>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Comentario</th>
                        <th>Origen</th>
                        <th>¿Es crédito?</th>
                    </tr>
                </thead>
                <tbody>
                    {mockDataGastos.map((gasto) => {
                        return (
                            <tr>
                                <td>{gasto.fecha.toLocaleDateString('en-GB')}</td>
                                <td>{gasto.monto}</td>
                                <td>{gasto.categoria}</td>
                                <td>{gasto.comentario}</td>
                                <td>{gasto.origen}</td>
                                <td>{gasto.credito ? 'Si' : 'No'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>

    );
}

export default ListaGastos;