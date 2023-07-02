import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModificarGastosIngresos({ ingreso, gasto, showEditGastoIngreso, handleCloseEditGastoIngreso, handleShowEditGastoIngreso }) {

    return (
        <>
            <Button variant="dark" onClick={handleShowEditGastoIngreso}>
                Edit
            </Button>
            <Modal show={showEditGastoIngreso} onHide={handleCloseEditGastoIngreso}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control type="date" defaultValue={ingreso.fecha} />
                            <Form.Text className="text-muted">
                                Seleccione la fecha del movimiento de dinero
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Monto:</Form.Label>
                            <Form.Control type="number" defaultValue={ingreso.monto} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Categoría:</Form.Label>
                            <Form.Control type="text" defaultValue={ingreso.categoria} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Comentario:</Form.Label>
                            <Form.Control type="text" defaultValue={ingreso.comentario} />
                            <Form.Text className="text-muted">
                                Opcional, para identificar el movimiento
                            </Form.Text>
                        </Form.Group>

                        {ingreso &&

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Destino ingreso:</Form.Label>
                                <Form.Control type="text" defaultValue={ingreso.destino} />
                            </Form.Group>

                        }

                        {gasto &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Origen egreso:</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="¿Es con crédito?" />
                                </Form.Group>
                            </>

                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditGastoIngreso}>
                        Cancelar
                    </Button>
                    <Button variant="primary">
                        Guardar billetera
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModificarGastosIngresos;