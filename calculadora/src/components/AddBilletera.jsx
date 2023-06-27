import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddBilletera({ handleCloseAddB, handleShowAddB, showAddBilletera, setCheckboxAddB, checkboxAddB, handleGuardarBilletera, setNombreBilletera, setDiaPagoCredito }) {

    const handleCheckboxChangeAddB = (event) => {
        setCheckboxAddB(event.target.checked)
    }
    const handleNombreChange = (event) => {
        setNombreBilletera(event.target.value)
    }
    const handleDateChange = (event) => {
        const day = new Date(event.target.value)
        setDiaPagoCredito(day.getDate('en-GB'))
        console.log(day)
        console.log(event.target.value)
    }

    return (
        <>
            <Button variant="dark" onClick={handleShowAddB}>
                Agregar una billetera
            </Button>

            <Modal show={showAddBilletera} onHide={handleCloseAddB}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva billetera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la nueva billetera"
                                autoFocus
                                onChange={handleNombreChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check onChange={handleCheckboxChangeAddB} type="checkbox" label="¿Podrás tomar crédito?" />
                        </Form.Group>

                        {checkboxAddB &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Fecha de próximo cierre</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddB}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarBilletera}>
                        Guardar billetera
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddBilletera;