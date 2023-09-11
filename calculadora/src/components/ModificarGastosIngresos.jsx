import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from 'react-bootstrap/Dropdown';

function ModificarGastosIngresos({ ingreso, gasto, editGasto, editIngreso, billeterasUsuario }) {

  const [showEditGastoIngreso, setShowEditGastoIngreso] = useState(false);

  const [montoEdit, setMontoEdit] = useState(0);
  const [fechaEdit, setFechaEdit] = useState(new Date().toISOString().slice(0, 10));
  const [comentarioEdit, setComentarioEdit] = useState(null);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [destinoEdit, setDestinoEdit] = useState(null);
  const [origenEdit, setOrigenEdit] = useState(null);
  const [creditoEdit, setCreditoEdit] = useState(null);
  const [cambioBilleId, setCambioBilleId] = useState(null)

  const cambioOrigen = (item) => {
    setOrigenEdit(item)
    const id = billeterasUsuario.find(bille => {
      if(bille.nombre == item){
        return setCambioBilleId(bille.id)
      }
    })
    
  }
  const cambioDestino = (item) => {
    setDestinoEdit(item)
    const id = billeterasUsuario.find(bille => {
      if(bille.nombre == item){
        return setCambioBilleId(bille.id)
      }
    })
    
  }
  
  const handleGuardarEdit = () => {

    if (ingreso) {
      const nuevoGastoIng = {
        ...ingreso,
        monto: montoEdit,
        date: fechaEdit,
        comentario: comentarioEdit,
        categoria: categoriaEdit,
        billeteraId: cambioBilleId,
        billetera: {nombre: origenEdit}
      };
      editIngreso(nuevoGastoIng, ingreso.billeteraId);
    } else {
      const nuevoGastoIng = {
        ...gasto,
        monto: montoEdit,
        date: fechaEdit,
        comentario: comentarioEdit,
        categoria: categoriaEdit,
        credito: creditoEdit,
        billeteraId: cambioBilleId,
        billetera: {nombre: origenEdit}
      };
      editGasto(nuevoGastoIng, gasto.billeteraId);
    }
    setShowEditGastoIngreso(false);
  };

  const handleShowEditGastoIngreso = () => {
    if (ingreso) {
      setMontoEdit(ingreso.monto);
      setFechaEdit(ingreso.date);
      setCategoriaEdit(ingreso.categoria);
      setComentarioEdit(ingreso.comentario);
      setDestinoEdit(ingreso.billetera.nombre);
      setCambioBilleId(ingreso.billeteraId)
    } else {
      setMontoEdit(gasto.monto);
      setFechaEdit(gasto.date);
      setCategoriaEdit(gasto.categoria);
      setComentarioEdit(gasto.comentario);
      setOrigenEdit(gasto.billetera.nombre);
      setCreditoEdit(gasto.credito);
      setCambioBilleId(gasto.billeteraId)

    }

    setShowEditGastoIngreso(true);
  };


  return (
    <>
      <Button variant="dark" onClick={() => handleShowEditGastoIngreso()}>
        Edit
      </Button>
      <Modal
        show={showEditGastoIngreso}
        onHide={() => setShowEditGastoIngreso(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modificar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {ingreso && (
              <>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    onChange={(event) => setFechaEdit(event.target.value)}
                    type="date"
                    defaultValue={new Date(fechaEdit).toISOString().slice(0, 10)}
                  />
                  <Form.Text className="text-muted">
                    Seleccione la fecha del movimiento de dinero
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNumber">
                  <Form.Label>Monto:</Form.Label>
                  <Form.Control
                    onChange={(event) => setMontoEdit(event.target.value)}
                    type="number"
                    defaultValue={montoEdit}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Categoría:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setCategoriaEdit(event.target.value)}
                    defaultValue={categoriaEdit}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setComentarioEdit(event.target.value)}
                    defaultValue={comentarioEdit}
                  />
                  <Form.Text className="text-muted">
                    Opcional, para identificar el movimiento
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Destino Ingreso:</Form.Label>
                  <div className="input-group">
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        {destinoEdit || "Select Origen"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {billeterasUsuario.map((item) => (
                          <Dropdown.Item
                            key={item.id}
                            onClick={() => cambioDestino(item.nombre)}
                          >
                            {item.nombre}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      type="text"
                      value={destinoEdit || ""}
                      placeholder="Destino ingreso"
                      disabled
                    />
                  </div>
                </Form.Group>
              </>
            )}

            {gasto && (
              <>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(event) => setFechaEdit(event.target.value)}
                    defaultValue={new Date(fechaEdit).toISOString().slice(0, 10)}

                  />
                  <Form.Text className="text-muted">
                    Seleccione la fecha del movimiento de dinero
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNumber">
                  <Form.Label>Monto:</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(event) => setMontoEdit(event.target.value)}
                    value={montoEdit}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Categoría:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setCategoriaEdit(event.target.value)}
                    defaultValue={categoriaEdit}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setComentarioEdit(event.target.value)}
                    defaultValue={comentarioEdit}
                  />
                  <Form.Text className="text-muted">
                    Opcional, para identificar el movimiento
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Origen Egreso:</Form.Label>
                  <div className="input-group">
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        {origenEdit || "Select Origen"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {billeterasUsuario.map((item) => (
                          <Dropdown.Item
                            key={item.id}
                            onClick={() => cambioOrigen(item.nombre)}
                          >
                            {item.nombre}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      type="text"
                      value={origenEdit || ""}
                      placeholder="Origen egreso"
                      disabled
                    />
                  </div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="¿Es con crédito?"
                    onChange={(event) => setCreditoEdit(event.target.value)}
                    defaultChecked={creditoEdit}
                    disabled
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditGastoIngreso(false)}>
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
