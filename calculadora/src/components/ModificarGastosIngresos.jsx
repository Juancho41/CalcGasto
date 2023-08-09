import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ModificarGastosIngresos({ ingreso, gasto, editGasto, editIngreso }) {

  const [showEditGastoIngreso, setShowEditGastoIngreso] = useState(false);

  const [montoEdit, setMontoEdit] = useState(0);
  const [fechaEdit, setFechaEdit] = useState(new Date().toISOString().slice(0, 10));
  const [comentarioEdit, setComentarioEdit] = useState(null);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [destinoEdit, setDestinoEdit] = useState(null);
  const [origenEdit, setOrigenEdit] = useState(null);
  const [creditoEdit, setCreditoEdit] = useState(null);


  const handleGuardarEdit = (id) => {
    if (ingreso) {
      const nuevoGastoIng = {
        ...ingreso,
        monto: montoEdit,
        fecha: fechaEdit,
        comentario: comentarioEdit,
        categoria: categoriaEdit,
        destino: destinoEdit,
      };
      editIngreso(nuevoGastoIng);
    } else {
      const nuevoGastoIng = {
        ...gasto,
        monto: montoEdit,
        fecha: fechaEdit,
        comentario: comentarioEdit,
        categoria: categoriaEdit,
        origen: origenEdit,
        credito: creditoEdit,
      };
      editGasto(nuevoGastoIng);
    }
    setShowEditGastoIngreso(false);
  };

  const handleShowEditGastoIngreso = () => {
    if (ingreso) {
      setMontoEdit(ingreso.monto);
      setFechaEdit(ingreso.fecha);
      setCategoriaEdit(ingreso.categoria);
      setComentarioEdit(ingreso.comentario);
      setDestinoEdit(ingreso.destino);
    } else {
      setMontoEdit(gasto.monto);
      setFechaEdit(gasto.date);
      setCategoriaEdit(gasto.categoria);
      setComentarioEdit(gasto.comentario);
      setOrigenEdit(gasto.origen);
      setCreditoEdit(gasto.credito);

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
                  <Form.Label>Destino ingreso:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setDestinoEdit(event.target.value)}
                    defaultValue={destinoEdit}
                  />
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
                  <Form.Label>Origen egreso:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setOrigenEdit(event.target.value)}
                    defaultValue={origenEdit}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="¿Es con crédito?"
                    onChange={(event) => setCreditoEdit(event.target.value)}
                    defaultChecked={creditoEdit}
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
