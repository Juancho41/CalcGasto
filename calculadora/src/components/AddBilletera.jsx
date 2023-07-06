import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddBilletera({ handleCloseAddB, handleShowAddB, showAddBilletera, setCheckboxAddB, checkboxAddB, handleGuardarBilletera, setNombreBilletera, setDiaPagoCredito, setDiaCierreCredito }) {

    const handleCheckboxChangeAddB = (event) => {
        setCheckboxAddB(event.target.checked)
    }
    const handleNombreChange = (event) => {
        setNombreBilletera(event.target.value)
    }
    const handleDateCierreChange = (event) => {
        const dayCierre = new Date(event.target.value)
        setDiaCierreCredito(dayCierre.getDate('en-GB'))

    }

    const handleDatePagoChange = (event) => {
        const dayPago = new Date(event.target.value)
        setDiaPagoCredito(dayPago.getDate('en-GB'))

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
                                    onChange={handleDateCierreChange}
                                />
                                <Form.Label>Fecha de próximo pago de credito</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={handleDatePagoChange}
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