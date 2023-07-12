import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModificarGastosIngresos({ ingreso, gasto, showEditGastoIngreso, handleCloseEditGastoIngreso, handleShowEditGastoIngreso, handleFechaChange, handleMontoChange }) {
    const [montoEdit, setMontoEdit] = useState(ingreso.monto)
    const [fechaEdit, setFechaEdit] = useState(ingreso.fecha)
    const [comentarioEdit, setComentarioEdit] = useState(ingreso.comentario)
    const [categoriaEdit, setCategoriaEdit] = useState(ingreso.categoria)
    const [destinoEdit, setDestinoEdit] = useState(ingreso.destino)
    const handleGuardarEdit = (id) => {
        const ingreso = ingresosUsuario.filter(ingreso => ingreso.id != id)

        const nuevoIng = {
            ...ingreso,
            monto: montoEdit,
            fecha: fechaEdit,
            comentario: comentarioEdit,
            categoria: categoriaEdit,
            destino: destinoEdit

        }

        

    };

    return (
        <>
            <Button variant="dark" onClick={() => handleShowEditGastoIngreso(ingreso.id)}>
                Edit
            </Button>
            <Modal show={showEditGastoIngreso} onHide={handleCloseEditGastoIngreso}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {ingreso &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Label>Fecha:</Form.Label>
                                    <Form.Control onChange={(event) => setFechaEdit(event.target.value)} type="date" placeholder={new Date(ingreso.fecha)} />
                                    <Form.Text className="text-muted">
                                        Seleccione la fecha del movimiento de dinero
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Monto:</Form.Label>
                                    <Form.Control onChange={(event) => setMontoEdit(event.target.value)} type="number" defaultValue={ingreso.monto} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Categoría:</Form.Label>
                                    <Form.Control type="text" onChange={(event) => setCategoriaEdit(event.target.value)} defaultValue={ingreso.categoria} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Comentario:</Form.Label>
                                    <Form.Control type="text" onChange={(event) => setComentarioEdit(event.target.value)} defaultValue={ingreso.comentario} />
                                    <Form.Text className="text-muted">
                                        Opcional, para identificar el movimiento
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Destino ingreso:</Form.Label>
                                    <Form.Control type="text" onChange={(event) => setDestinoEdit(event.target.value)} defaultValue={ingreso.destino} />
                                </Form.Group>
                            </>

                        }

                        {gasto &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Label>Fecha:</Form.Label>
                                    <Form.Control type="date" defaultValue={gasto.fecha} />
                                    <Form.Text className="text-muted">
                                        Seleccione la fecha del movimiento de dinero
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Monto:</Form.Label>
                                    <Form.Control type="number" defaultValue={gasto.monto} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Categoría:</Form.Label>
                                    <Form.Control type="text" defaultValue={gasto.categoria} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Comentario:</Form.Label>
                                    <Form.Control type="text" defaultValue={gasto.comentario} />
                                    <Form.Text className="text-muted">
                                        Opcional, para identificar el movimiento
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Origen egreso:</Form.Label>
                                    <Form.Control type="text" defaultValue={gasto.origen} />
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
                    <Button variant="primary" onClick={handleGuardarEdit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModificarGastosIngresos;