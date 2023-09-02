import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";

function FormGastoIng({
  handleSubmitGasIng,
  setDate,
  setMonto,
  setCategoria,
  setComentario,
  setDestino,
  setOrigen,
  setCheckbox,
  ingreso,
  gasto,
  destino,
  origen,
}) {
  const handleDateChange = (event) => {
    setDate(new Date(event.target.value).toISOString().substring(0, 10));
  };
  const handleMontoChange = (event) => {
    setMonto(Number(event.target.value));
  };
  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };
  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };
  const handleDestinoChange = (event) => {
    setDestino(event.target.value);
  };
  const handleOrigenChange = (event) => {
    setOrigen(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked);
  };

  return (
    <Form onSubmit={handleSubmitGasIng}>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha:</Form.Label>
        <Form.Control
          onChange={handleDateChange}
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          placeholder="Enter date"
        />
        <Form.Text className="text-muted">
          Seleccione la fecha del movimiento de dinero
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Monto:</Form.Label>
        <Form.Control
          onChange={handleMontoChange}
          type="number"
          placeholder="Ingrese monto"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Categoría:</Form.Label>
        <Form.Control
          onChange={handleCategoriaChange}
          type="text"
          placeholder="Categoría"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Comentario:</Form.Label>
        <Form.Control
          onChange={handleComentarioChange}
          type="text"
          placeholder="Comentario..."
        />
        <Form.Text className="text-muted">
          Opcional, para identificar el movimiento
        </Form.Text>
      </Form.Group>

      {ingreso && (
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Destino ingreso:</Form.Label>
          <Form.Control
            onChange={handleDestinoChange}
            type="text"
            defaultValue={destino}
            disabled
          />
        </Form.Group>
      )}

      {gasto && (
        <>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Origen egreso:</Form.Label>
            <Form.Control
              onChange={handleOrigenChange}
              type="text"
              defaultValue={origen}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleCheckboxChange}
              type="checkbox"
              label="¿Es con crédito?"
            />
          </Form.Group>
        </>
      )}

      <Button variant="primary" type="submit">
        Agregar
      </Button>
    </Form>
  );
}

export default FormGastoIng;
