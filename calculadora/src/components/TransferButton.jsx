import React, { useState } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';


const TransferButton = ({ billeterasUsuario, bille, tranferirBille }) => {
  const [show, setShow] = useState(false);
  const [monto, setMonto] = useState('');
  const [billeteraSeleccionada, setBilleteraSeleccionada] = useState('');

  const handleClose = () => {
    setShow(false);
    setBilleteraSeleccionada('')
    setMonto('');
  }
  const handleShow = () => setShow(true);

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const tranferir = () => {
    tranferirBille(bille, billeteraSeleccionada, monto)
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ⇆
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transferir desde: {bille.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={handleMontoChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Seleccionar Billetera de destino</Form.Label>
              <div className="input-group">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {billeteraSeleccionada.nombre || 'Seleccionar Billetera'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {billeterasUsuario.filter((billetera)=> billetera.id != bille.id).map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => setBilleteraSeleccionada(item)}
                      >
                        {item.nombre}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type="text"
                  value={billeteraSeleccionada.nombre || ""}
                  placeholder="Billetera a transferir"
                  disabled
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={tranferir}>
            Transferir!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransferButton;
